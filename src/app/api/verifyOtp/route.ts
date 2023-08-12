import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { verifyOtpRequestValidator } from './verifyOtp.validation';
import { UserService } from '@/services/server/user';
import { decodeJWT } from '@/utils/helpers';

export async function POST(request: NextRequest) {
    try {
        const { otp } = await request.json();
        const temporaryToken = request.cookies.get('temporary-token')?.value;
        if (!temporaryToken) return NextResponse.json({ error: 'Unable to authenticate' }, { status: 400 });
        const decodedTokenData = decodeJWT(temporaryToken);
        const email = decodedTokenData?.email ? decodedTokenData?.email : '';
        const isValid = verifyOtpRequestValidator.safeParse({ email, otp });
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        const existingUserData = await UserService.getUser(email);
        if (existingUserData.length === 0) return NextResponse.json({ error: 'Unable to verify, user does not exists.' }, { status: 400 });
        if (existingUserData[0].otp !== otp) return NextResponse.json({ error: 'Unable to verify, invalid otp.' }, { status: 400 });
        UserService.verifyUser(email);
        const accessToken = jwt.sign(
            {
                id: existingUserData[0].id,
                email: existingUserData[0].email,
                firstName: existingUserData[0].firstName,
                lastName: existingUserData[0].lastName,
            },
            process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || '',
            { expiresIn: 60 * 60 * 24 * 1 },
        );
        const response = NextResponse.json({ userData: existingUserData[0], redirect: '/' }, { status: 200 });
        response.cookies.set('temporary-token', '', { httpOnly: true, expires: new Date(0) });
        response.cookies.set({
            name: 'access_token',
            value: accessToken,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1,
        });
        return response;
    } catch (error) {
        // Exception Handling
        return NextResponse.json({
            message: error,
        });
    }
}

