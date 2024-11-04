import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { Container } from '../container/container';
import '../../styles.css';

type ComponentType = 'Editorial' | 'Commercial' | 'AboutMe';

type Props = {
    setActiveComponent: (component: ComponentType) => void;
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
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base',
    };

    const toggleCheckbox = () => setIsChecked((prev) => !prev);

    return (
        <div
            className={twMerge(
                'relative z-[1000]',
                sizeClassNames[size],
                className
            )}
        >
            {/* SVG Button */}
            <div className="menu cross menu--1 relative z-[1100] m-0 h-12 w-12 p-0">
                <label className="absolute flex h-full w-full cursor-pointer items-center justify-center text-white">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={toggleCheckbox}
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
                            className="opacity-0 hover:opacity-25"
                        />
                        <path
                            className="line--1 stroke-black"
                            d="M0 40h62c13 0 6 28-4 18L35 35"
                            strokeWidth="4"
                        />
                        <path
                            className="line--2 stroke-black"
                            d="M0 50h70"
                            strokeWidth="4"
                        />
                        <path
                            className="line--3 stroke-black"
                            d="M0 60h62c13 0 6-28-4-18L35 65"
                            strokeWidth="4"
                        />
                    </svg>
                </label>

                {/* Dropdown Menu */}
                <div
                    className={twMerge(
                        'fixed left-0 top-[--header-toprow-height] z-[1100] w-screen bg-white text-black shadow-lg transition-all duration-300 ease-in-out',
                        isChecked
                            ? 'scale-100 opacity-100'
                            : 'pointer-events-none scale-90 opacity-0'
                    )}
                >
                    <Container className="bg-background">
                        <ul className="flex flex-col">
                            {(
                                [
                                    'Editorial',
                                    'Commercial',
                                    'AboutMe',
                                ] as ComponentType[]
                            ).map((link) => (
                                <li
                                    key={link}
                                    className="cursor-pointer transition-colors duration-200 ease-in-out"
                                >
                                    <motion.a
                                        onClick={() => setActiveComponent(link)}
                                    >
                                        <motion.div
                                            className="py-2 text-base font-light uppercase"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 25,
                                            }}
                                        >
                                            {link}
                                        </motion.div>
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </Container>
                </div>
            </div>
        </div>
    );
};
