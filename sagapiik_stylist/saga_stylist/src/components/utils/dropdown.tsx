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
        <div
            className={twMerge(
                'relative right-10 grid h-screen w-screen bg-background font-medium text-white',
                sizeClassNames[size],
                className
            )}
        >
            <div className="menu cross menu--1 relative bg-backgroundContrast">
                <label className="absolute h-full w-full cursor-pointer text-white">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="30"
                            className="fill-[#fff3] opacity-0 transition-opacity duration-300 hover:opacity-100"
                        />
                        <path
                            className="line--1"
                            d="M0 40h62c13 0 6 28-4 18L35 35"
                        />
                        <path className="line--2" d="M0 50h70" />
                        <path
                            className="line--3"
                            d="M0 60h62c13 0 6-28-4-18L35 65"
                        />
                    </svg>
                </label>
                <div
                    className={twMerge(
                        'absolute left-0 top-14 transform bg-white text-black shadow-lg transition-all duration-300 ease-out',
                        isChecked
                            ? 'scale-100 opacity-100'
                            : 'pointer-events-none scale-95 opacity-0'
                    )}
                >
                    <ul className="flex flex-col overflow-hidden rounded-lg border border-backgroundContrast">
                        <li className="cursor-pointer px-4 py-2 font-headers transition-colors duration-200 ease-in-out hover:bg-backgroundContrast">
                            Editorial
                        </li>
                        <li className="cursor-pointer px-4 py-2 font-headers transition-colors duration-200 ease-in-out hover:bg-backgroundContrast">
                            Commercial
                        </li>
                        <li className="cursor-pointer px-4 py-2 font-headers transition-colors duration-200 ease-in-out hover:bg-backgroundContrast">
                            About Me
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
