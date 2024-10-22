import React from 'react';
import 'flowbite';

export default function CardDetailCancer() {
    return (
        <div className="max-w-sm bg-blue-600 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="">
                <img className="rounded-t-lg w-96" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJhKmWS9XPsmnhzHWg9YU2VI6ZxprqKZhsKg&s" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white text-center">What is Cancer?</h5>
                </a>
            </div>
        </div>

        

    );
}