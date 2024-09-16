import React from 'react';
import 'flowbite';

export default function FlexTwoSideCancer() {
    return (
        <div className='bg-white p-4 flex flex-col lg:flex-row justify-between my-10'>
            {/* Text Section */}
            <div className='flex-1 flex flex-col mb-10 lg:mb-0 py-4'>
                <div className='text-4xl font-bold mb-4'>Get engaged and have an impact</div>
                <div className='text-lg mb-6'>
                    Cancer does not let up. However, we are also included. Whether you engage in fundraising, commit to leaving a gift in your will, or make a donation. Each component contributes to research that saves lives. Contribute to the cause and we will defeat cancer as a team.
                </div>
                <div>
                    <button type="button" className="mt-6 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        Get Involved Now
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className='flex-1 flex justify-center'>
                <img className='h-72 w-full max-w-lg rounded-lg object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJhKmWS9XPsmnhzHWg9YU2VI6ZxprqKZhsKg&s" alt="community image" />
            </div>
        </div>
    );
}