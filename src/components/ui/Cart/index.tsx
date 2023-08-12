import React from 'react';
import { BiCartAlt } from 'react-icons/bi';

interface Props {
    totalItems: number;
}

const Cart = ({ totalItems = 0 }: Props) => {
    return (
        <div className="relative cursor-pointer">
            <BiCartAlt className="text-2xl" />
            {totalItems > 0 && (
                <div className="w-full h-full max-w-[1.1rem] max-h-[1.1rem] bg-cartRed text-smoke rounded-full absolute top-[-0.55rem] right-[-0.8rem] text-[0.8rem] bold p-0 m-0 flex justify-center items-center font-sans">
                    {totalItems}
                </div>
            )}
        </div>
    );
};

export default Cart;

