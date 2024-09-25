import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { Container } from '../container/container';

type Props = {
    setActiveComponent: (component: string) => void;
    size?: 'small' | 'medium' | 'large';
    className?: string;
};

export const Dropdownmenu = ({
    setActiveComponent,
    size = 'medium',
    className,
}: Props) => {
    const [isChecked, setIsChecked] = useState(false);

    const sizeClassNames = {
        small: 'text-xs px-2 py-1',
        medium: 'text-sm px-5 py-3',
        large: 'text-base px-8 py-4',
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div
            className={twMerge(
                'relative right-5 grid bg-background font-medium text-white md:right-10',
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
                        'fixed left-0 top-[--header-row-height-border] w-screen transform bg-white text-black shadow-lg transition-all duration-300 ease-in-out',
                        isChecked
                            ? 'scale-100 opacity-100'
                            : 'pointer-events-none scale-90 opacity-0'
                    )}
                >
                    <Container className="relative w-full bg-background">
                        <ul className="flex flex-col">
                            <li className="cursor-pointer font-sans transition-colors duration-200 ease-in-out">
                                <motion.a
                                    onClick={() =>
                                        setActiveComponent('Editorial')
                                    }
                                >
                                    <motion.div
                                        className="py-1 font-sans text-base font-light uppercase md:py-2 md:text-lg lg:py-3"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 25,
                                        }}
                                    >
                                        Editorial
                                    </motion.div>
                                </motion.a>
                            </li>
                            <li className="cursor-pointer font-sans transition-colors duration-200 ease-in-out">
                                <motion.a
                                    onClick={() =>
                                        setActiveComponent('Factorial')
                                    }
                                >
                                    <motion.div
                                        className="py-1 font-sans text-base font-light uppercase md:py-2 md:text-lg lg:py-3"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 25,
                                        }}
                                    >
                                        Factorial
                                    </motion.div>
                                </motion.a>
                            </li>
                            <li className="cursor-pointer transition-colors duration-200 ease-in-out">
                                <motion.a
                                    onClick={() =>
                                        setActiveComponent('AboutMe')
                                    }
                                >
                                    <motion.div
                                        className="py-1 font-sans text-base font-light uppercase md:py-2 md:text-lg lg:py-3"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 25,
                                        }}
                                    >
                                        About Me
                                    </motion.div>
                                </motion.a>
                            </li>
                        </ul>
                    </Container>
                </div>
            </div>
        </div>
    );
};
