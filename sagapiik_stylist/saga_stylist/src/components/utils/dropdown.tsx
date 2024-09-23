import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import '../../styles.css'; // Import the CSS file

type Props = {
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export const Dropdownmenu = ({ size = 'medium', className }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const sizeClassNames = {
    // 12px
    small: 'text-xs px-2 py-1',
    // 14px
    medium: 'text-sm px-5 py-3',
    // 17px
    large: 'text-base px-8 py-4',
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={twMerge(
        'relative grid text-white font-medium bg-background w-screen h-screen right-10',
        sizeClassNames[size],
        className
      )}>
        <div className="relative menu cross menu--1 bg-backgroundContrast">
          <label className="absolute text-white cursor-pointer w-full h-full">
            <input type="checkbox" className="hidden" checked={isChecked} onChange={handleCheckboxChange} />
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50" cy="50" r="30" className="fill-[#fff3] opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
              <path className="line--2" d="M0 50h70" />
              <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
            </svg>
          </label>
          <div className={twMerge(
            'absolute top-14 left-0 bg-white text-black shadow-lg transition-all duration-300 ease-out transform',
            isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          )}>
            <ul className="flex flex-col border border-backgroundContrast rounded-lg overflow-hidden">
              <li className="px-4 py-2 hover:bg-backgroundContrast cursor-pointer font-headers transition-colors duration-200 ease-in-out">Editorial</li>
              <li className="px-4 py-2 hover:bg-backgroundContrast cursor-pointer font-headers transition-colors duration-200 ease-in-out">Commercial</li>
              <li className="px-4 py-2 hover:bg-backgroundContrast cursor-pointer font-headers transition-colors duration-200 ease-in-out">About Me</li>
            </ul>
          </div>
        </div>
    </div>
  );
};