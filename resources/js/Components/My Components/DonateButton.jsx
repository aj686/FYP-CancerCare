import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function DonateButton() {
    return (
        <Link href="/donate" className="sm:ms-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex justify-center items-center py-3 px-6 text-base 
              font-medium text-white rounded-full bg-rose-600 hover:bg-rose-700 
              transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
                />
              </svg>
              Donate Now
            </span>
          </motion.button>
        </Link>
      );
};
