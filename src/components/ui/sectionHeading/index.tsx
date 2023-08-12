import React from 'react';

interface Props {
    title: string;
    heading: string;
}

const SectionHeading = ({ title, heading }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-center justify-center text-md text-blue font-bold">{title}</h3>
            <p className="text-center text-2xl font-bold">{heading}</p>
        </div>
    );
};

export default SectionHeading;

