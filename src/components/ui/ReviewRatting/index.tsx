import { styles } from '@/components/customStyles';
import { FixRater } from '@/components/ui';
import React from 'react';
import SectionHeading from '../sectionHeading';

const ReviewRatting = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-auto mt-[1rem]">
            <div className="text-md font-medium w-full hover:text-cartRed">Ratings</div>
            <div className={`w-full grid lg:grid-cols-2 gap-8 items-center`}>
                <div className="white-long flex flex-col gap-[1rem]">
                    <div className="flex items-end gap-[1rem]">
                        <span className="text-[4rem] font-semibold">3.7</span>
                        <span className="text-xl font-bold pb-[1rem]">out of</span>
                        <span className="text-[4rem] font-semibold">5.0</span>
                    </div>
                    <div className="mb-[0.5rem] flex items-center gap-[0.2rem]">
                        <FixRater rating={3.9} />
                        <span className="text-sm text-black">(3.7)</span>
                        <span className="text-sm text-dakrBlue underline cursor-pointer hover:text-cartRed hover:no-underline">1347 reviews</span>
                    </div>
                    <div className="flex items-center gap-[2rem]">
                        <button className="h-[1.53rem] text-sm rounded-full font-semibold text-darkBlue bg-white outline-2 outline-darkBlue outline-none border-none flex justify-center items-center px-[1.8rem]">
                            See all reviews
                        </button>
                        <button className="h-[2.2rem] text-sm rounded-full font-semibold text-white bg-darkBlue outline-none border-none flex justify-center items-center px-[2rem]">
                            Write a review
                        </button>
                    </div>
                </div>
                <div className="white-long flex flex-col gap-[0.2rem]">
                    <div className="grid grid-cols-7 gap-[1rem] items-center">
                        <div className="min-w-[6rem]">
                            <FixRater rating={5} />
                        </div>
                        <div className="white-long col-span-5 relative w-full h-[0.3rem] rounded-full bg-lightGrey">
                            <div className="top-0 left-0 w-[44%] h-[0.3rem] bg-darkBlue"></div>
                        </div>
                        <span className="font-medium text-md">11223</span>
                    </div>
                    <div className="grid grid-cols-7 gap-[1rem] items-center">
                        <div className="min-w-[6rem]">
                            <FixRater rating={4} />
                        </div>
                        <div className="white-long col-span-5 relative w-full h-[0.3rem] rounded-full bg-lightGrey">
                            <div className="top-0 left-0 w-[4%] h-[0.3rem] bg-darkBlue"></div>
                        </div>
                        <span className="font-medium text-md">123</span>
                    </div>
                    <div className="grid grid-cols-7 gap-[1rem] items-center">
                        <div className="min-w-[6rem]">
                            <FixRater rating={3} />
                        </div>
                        <div className="white-long col-span-5 relative w-full h-[0.3rem] rounded-full bg-lightGrey">
                            <div className="top-0 left-0 w-[52%] h-[0.3rem] bg-darkBlue"></div>
                        </div>
                        <span className="font-medium text-md">15570</span>
                    </div>
                    <div className="grid grid-cols-7 gap-[1rem] items-center">
                        <div className="min-w-[6rem]">
                            <FixRater rating={2} />
                        </div>
                        <div className="white-long col-span-5 relative w-full h-[0.3rem] rounded-full bg-lightGrey">
                            <div className="top-0 left-0 w-[12%] h-[0.3rem] bg-darkBlue"></div>
                        </div>
                        <span className="font-medium text-md">609</span>
                    </div>
                    <div className="grid grid-cols-7 gap-[1rem] items-center">
                        <div className="min-w-[6rem]">
                            <FixRater rating={1} />
                        </div>
                        <div className="white-long col-span-5 relative w-full h-[0.3rem] rounded-full bg-lightGrey">
                            <div className="top-0 left-0 w-[17%] h-[0.3rem] bg-darkBlue"></div>
                        </div>
                        <span className="font-medium text-md">934</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewRatting;

