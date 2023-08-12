import React from 'react';
import Image from 'next/image';

interface Props {
    discountPercent: number;
    totalSold: string;
    price: string;
    image: string;
}

const BannerCard = ({ discountPercent, totalSold, image, price }: Props) => {
    return (
        <div className="h-auto w-[9rem] rounded-md overflow-hidden flex flex-col justify-between items-center cursor-pointer">
            <div className="relative h-[9rem] w-[9rem] !rounded-md border-none outline-none overflow-hidden">
                <Image src={image} alt="Metaverse" fill className={'!static'} />
                <div className="absolute rounded-br-xl bg-cartRed text-white font-light text-md flex justify-center items-center top-0 left-0 w-[3rem]">
                    -{discountPercent}%
                </div>
            </div>
            <div className="flex flex-col w-[9rem]">
                <p className="font-bold text-base text-cartRed font-sans">{price}</p>
                <p className="font-bold text-sm text-white">{totalSold}</p>
            </div>
        </div>
    );
};

export default BannerCard;

