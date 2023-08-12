'use client';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

interface Props {
    rating: number;
}

const FixRater = ({ rating }: Props) => {
    // return <Rater rating={rating} total={5} interactive={false} />;
    return (
        <div className="text-darkBlue flex items-center">
            {rating} <AiFillStar className="text-md" />
        </div>
    );
};

export default FixRater;

