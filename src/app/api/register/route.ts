import { NextRequest, NextResponse } from 'next/server';
import OTPGenerator from 'otp-generator';
import { userValidator } from './register.validation';
import { UserService } from '@/services/server/user';
import { EmailService } from '@/services/Email';

export async function POST(request: NextRequest) {
    try {
        // get all the data from front end
        const { firstName, lastName, dob, email, password } = await request.json();
        const isValid = userValidator.safeParse({ firstName, lastName, dob, email, password });
        if (!isValid.success) return NextResponse.json({ error: isValid.error.issues[0].message }, { status: 400 });
        const existingUserData = await UserService.getUser(email);
        if (existingUserData.length > 0) return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        const otp = OTPGenerator.generate(6, { specialChars: false });
        EmailService.SendMail(email, 'Verification Code - O DINE MARKET', otp);
        const userData = await UserService.createUser({
            firstName,
            lastName,
            dob,
            email,
            userPassword: password,
            verified: false,
            otp,
        });
        const jwtToken = await UserService.getTemporaryToken(userData[0].id, firstName, lastName, email);
        console.log('jwtToken >', jwtToken);
        if (!jwtToken) return NextResponse.json({ error: 'Unable to generate temporary access token' }, { status: 500 });
        const response = NextResponse.json({ success: true }, { status: 200 });
        response.cookies.set({
            name: 'temporary-token',
            value: `${jwtToken}`,
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 1,
        });
        return response;
    } catch (error) {
        // Exception Handling
        return NextResponse.json(
            {
                message: error,
            },
            { status: 500 },
        );
    }
}

