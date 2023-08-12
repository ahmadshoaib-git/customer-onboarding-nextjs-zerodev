import React from 'react';
import Image from 'next/image';
import FixRater from '../../FixRater';

interface Props {
    width?: string;
    imageSize?: string;
    discountPercent: number;
    totalSold: string;
    price: string;
    image: string;
    description: string;
    ratting?: number;
    isRed?: boolean;
}

const GeneralCard = ({ description, discountPercent, totalSold, image, price, ratting, width, imageSize, isRed = false }: Props) => {
    return (
        <div
            className={`bg-white h-auto ${
                width ? width : 'w-[12rem]'
            } outline-[1rem] outline-white rounded-base  overflow-hidden flex flex-col gap-[0.5rem] items-center cursor-pointer hover:outline hover:outline-2 hover:outline-cartRed card-transition hover:card-shadow`}
        >
            <div className={`relative ${imageSize ? imageSize : 'h-[11rem] w-[11rem]'} mt-[0.5rem] !rounded-md border-none outline-none overflow-hidden`}>
                <Image src={image} alt="Metaverse" fill className={'!static'} />
                <div className={`absolute rounded-br-xl bg-cartRed text-white font-light text-md flex justify-center items-center top-0 left-0 w-[3rem]`}>
                    -{discountPercent}%
                </div>
            </div>
            <div className={`flex flex-col ${width ? width : 'w-[12rem]'} px-[0.5rem] py-[0.6rem]`}>
                <p className={`font-bold text-base ${isRed ? 'text-cartRed' : 'text-darkBlue'} font-sans`}>{price}</p>
                <p>{description}</p>
                {ratting && (
                    <div className="font-bold text-sm text-darkBlue">
                        <FixRater rating={ratting || 0} />
                    </div>
                )}
                <p className="font-bold text-sm text-darkBlue">({totalSold})</p>
                <div className="flex items-center flex-wrap gap-[0.3rem] mt-[0.4rem]">
                    <span className="flex items-center text-cartRed bg-cartRedLowOpacity rounded-sm text-xs px-[0.4rem] h-[1.2rem] mb-[0.25rem]">Pickup</span>
                    <span className="flex items-center text-cartRed bg-cartRedLowOpacity rounded-sm text-xs px-[0.4rem] h-[1.2rem] mb-[0.25rem]">
                        Free delivery
                    </span>
                    <span className="flex items-center text-cartRed bg-cartRedLowOpacity rounded-sm text-xs px-[0.4rem] h-[1.2rem] mb-[0.25rem]">
                        1 day delivery
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GeneralCard;

