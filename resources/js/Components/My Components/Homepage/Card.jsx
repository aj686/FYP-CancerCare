import React from 'react';
import 'flowbite';

export default function Card( {title, description, icon} ) {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-center text-center  ">
            <div>
                {icon}
            </div>
            <div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </div>
            <div>   
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
            </div>       
        </div>
    );
}