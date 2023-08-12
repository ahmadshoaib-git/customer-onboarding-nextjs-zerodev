'use client';
import React from 'react';
import { Input } from '@/components/ui';
import { Calendar } from '../../../../y/calendar';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { CustomCalendar } from '@/components/ui/Calender';
import { UserClientService } from '@/services/client/user';
import { useRouter } from 'next/navigation';
import { BiRefresh } from 'react-icons/bi';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    password: string;
    confirmPassword: string;
};

function SignUpForm() {
    const [showPass, setShowPass] = React.useState<boolean>(true);
    const [showConfirmPass, setShowConfirmPass] = React.useState<boolean>(true);
    const [loader, setloader] = React.useState<boolean>(false);
    const { replace } = useRouter();
    const schema: ZodType<FormData> = z
        .object({
            firstName: z.string().min(2).max(30),
            lastName: z.string().min(2).max(30),
            email: z.string().email(),
            dob: z.string(),
            password: z.string().min(5).max(20),
            confirmPassword: z.string().min(5).max(20),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const submitData = (data: FormData) => {
        try {
            setloader(true);
            UserClientService.registerUser({
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                email: data.email,
                password: data?.password,
            });
            console.log('IT WORKED', JSON.stringify(data));
            replace('/verifyOtp');
        } catch (err) {
            console.log(err);
        } finally {
            setloader(false);
        }
    };

    const inputWrapper = (error: any) =>
        `relative px-4 py-[0.1rem] border border-2 !bg-[#F5F5F5] border-smoke flex gap-[0.5rem] items-center rounded-full h-[3rem] hover:border-darkGrey ${
            error && '!border-cartRed'
        }`;
    const inputStyles = '!bg-[#F5F5F5] placeholder-darkGrey text-black h-full w-full border-none outline-none text-sm';
    const errorText = '!text-cartRed text-sm ml-[1.1rem]';
    return (
        <div className="p-[3rem] h-full w-full">
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-[1rem]">
                {/***** First Name *****/}
                <div>
                    <div className={inputWrapper(errors.firstName)}>
                        <input placeholder="First Name *" className={inputStyles} {...register('firstName')} />
                    </div>
                    {errors.firstName && <span className={errorText}> *{errors.firstName.message}</span>}
                </div>
                {/***** Last Name *****/}
                <div>
                    <div className={inputWrapper(errors.lastName)}>
                        <input placeholder="Last Name *" className={inputStyles} {...register('lastName')} />
                    </div>
                    {errors.lastName && <span className={errorText}> *{errors.lastName.message}</span>}
                </div>
                {/***** Email *****/}
                <div>
                    <div className={inputWrapper(errors.email)}>
                        <input placeholder="Email *" className={inputStyles} {...register('email')} />
                    </div>
                    {errors.email && <span className={errorText}> *{errors.email.message}</span>}
                </div>
                {/***** Age *****/}
                <div>
                    <div className={inputWrapper(errors.dob)}>
                        {/* <input
                            type="date"
                            placeholder="Date of Birth *"
                            className={`${inputStyles} cursor-pointer`}
                            {...register('dob', { valueAsNumber: true })}
                        /> */}
                        <Controller
                            control={control}
                            name="dob"
                            render={({ field }) => (
                                <input
                                    type="date"
                                    placeholder="Date of Birth *"
                                    className={`${inputStyles} cursor-pointer`}
                                    onChange={(date) => field.onChange(date)}
                                    value={field.value}
                                />
                                // <CustomCalendar placeholderText="Select date" setDate={(date) => field.onChange(date)} date={field.value} />
                                // <DatePicker placeholderText="Select date" onChange={(date) => field.onChange(date)} selected={field.value} />
                            )}
                        />
                    </div>
                    {errors.dob && <span className={errorText}> *{errors.dob.message}</span>}
                </div>
                {/***** Password *****/}
                <div>
                    <div className={inputWrapper(errors.password)}>
                        <input placeholder="Password *" type={showPass ? 'password' : 'text'} className={inputStyles} {...register('password')} />
                        <div className="absolute right-[0.5rem] cursor-pointer" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <AiFillEye className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                        </div>
                    </div>

                    {errors.password && <span className={errorText}> *{errors.password.message}</span>}
                </div>
                {/***** Confirm Password *****/}
                <div>
                    <div className={inputWrapper(errors.confirmPassword)}>
                        <input
                            placeholder="Confirm Password *"
                            type={showConfirmPass ? 'password' : 'text'}
                            className={inputStyles}
                            {...register('confirmPassword')}
                        />
                        <div className="absolute right-[0.5rem] cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                            {showConfirmPass ? <AiFillEye className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                        </div>
                    </div>
                    {errors.confirmPassword && <span className={errorText}> *{errors.confirmPassword.message}</span>}
                </div>
                {/***** Button *****/}
                <div className="flex flex-col gap-[0.4rem] items-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full h-[3rem] mt-[1rem] font-medium rounded-full red-gradient text-white"
                    >
                        <span className="mr-[0.25rem]">Register</span>
                        <span className="text-white">{loader && <BiRefresh className="text-2xl rotate-circular" />}</span>
                    </button>
                    <p className="text-darkBlue text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="underline text-blue">
                            Login
                        </Link>{' '}
                        here.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;

