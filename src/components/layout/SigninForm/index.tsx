'use client';
import React from 'react';
import { Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import Link from 'next/link';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { UserClientService } from '@/services/client/user';
import { useRouter } from 'next/navigation';

type FormData = {
    email: string;
    password: string;
};

function SignInForm() {
    const [showPass, setShowPass] = React.useState<boolean>(true);
    const schema: ZodType<FormData> = z.object({
        email: z.string().email(),
        password: z.string().min(5).max(20),
    });
    const { replace } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const submitData = async (data: FormData) => {
        try {
            const res = await UserClientService.loginUser(data?.email, data?.password);
            console.log('IT WORKED', JSON.stringify(data));
            if (res?.redirect) replace(res?.redirect);
        } catch (err) {
            console.log(err);
        }
    };

    const inputWrapper = (error: any) =>
        `relative px-4 py-[0.1rem] border border-2 !bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-full h-[3rem] ${
            error && '!border-cartRed'
        }`;
    const inputStyles = '!bg-[#F5F5F5] placeholder-darkGrey text-black h-full w-full border-none outline-none text-sm';
    const errorText = 'text-cartRed text-sm ml-[1.1rem]';
    return (
        <div className="p-[3rem] h-full w-full">
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-[1rem]">
                <div>
                    <div className={inputWrapper(errors.email)}>
                        <input placeholder="Email *" className={inputStyles} {...register('email')} />
                    </div>
                    {errors.email && <span className={errorText}> *{errors.email.message}</span>}
                </div>

                <div>
                    <div className={inputWrapper(errors.password)}>
                        <input type={showPass ? 'password' : 'text'} placeholder="Password *" className={inputStyles} {...register('password')} />
                        <div className="absolute right-[0.5rem] cursor-pointer" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <AiFillEye className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                        </div>
                    </div>
                    {errors.password && <span className={errorText}> *{errors.password.message}</span>}
                </div>
                <div className="flex flex-col gap-[0.4rem] items-center">
                    <button type="submit" className="w-full h-[3rem] red-gradient text-white font-medium rounded-full">
                        Sign In
                    </button>
                    <p className="text-darkBlue text-sm">
                        New Member?{' '}
                        <Link href="/register" className="underline text-blue">
                            Register
                        </Link>{' '}
                        here.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;

