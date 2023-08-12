import React from 'react';

interface Props {
    text: string;
}

const BadgeChip = ({ text }: Props) => {
    return (
        <div className="bg-cartRedLowOpacity text-cartRed flex justify-center items-center px-[1.2rem] py-[0.4rem] m-0 font-semibold text-md rounded-md">
            {text}
        </div>
    );
};

export default BadgeChip;

