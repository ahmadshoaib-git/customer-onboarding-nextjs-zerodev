import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { userValidator } from './login.validation';
import { UserService } from '@/services/server/user';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        console.log(email, password);
        const isValid = userValidator.safeParse({ email, password });
        console.log(isValid);
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        const existingUserData = await UserService.getUser(email);
        console.log(existingUserData);
        if (existingUserData.length === 0) return NextResponse.json({ error: 'Unable to verify, user does not exists.' }, { status: 400 });
        console.log(existingUserData[0]);
        if (!existingUserData[0].verified) {
            console.log('user not verified');
            const jwtToken = await UserService.getTemporaryToken(existingUserData[0].id, existingUserData[0].firstName, existingUserData[0].lastName, email);
            if (!jwtToken) return NextResponse.json({ error: 'Unable to generate temporary access token' }, { status: 500 });
            const response = NextResponse.json({ redirect: '/verifyOtp' }, { status: 200 });
            response.cookies.set({
                name: 'temporary-token',
                value: `${jwtToken}`,
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 1,
            });
            return response;
        }
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
        const response = NextResponse.json({ redirect: '/' }, { status: 200 });
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

