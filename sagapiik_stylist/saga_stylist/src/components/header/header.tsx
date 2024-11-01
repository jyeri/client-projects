import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../container/container';
import { Hoverlink } from '../utils/hoverlink';
import { Dropdownmenu } from '../utils/dropdown';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
    setActiveComponent: (component: string) => void;
    activeComponent: string;
}

export const Header: React.FC<HeaderProps> = ({
    setActiveComponent,
    activeComponent,
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header
                ref={headerRef}
                className={twMerge(
                    'sticky top-0 z-50 bg-background text-black',
                    isScrolled ? 'border-b border-backgroundContrast' : ''
                )}
            >
                <Container className="flex min-h-[--header-row-height] items-center justify-center">
                    <a href="#" onClick={() => setActiveComponent('Editorial')}>
                        <p className="pb-3 pt-6 font-headers text-3.5xl font-semibold tracking-wide3xl">
                            SAGA PIIK
                        </p>
                    </a>
                    {isScrolled && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="md:right-30 xl:right-50 visible absolute right-0 top-0 z-50 pt-6 sm:right-20 lg:right-40"
                            >
                                <Dropdownmenu
                                    setActiveComponent={setActiveComponent}
                                />
                            </motion.div>
                        </>
                    )}
                </Container>
            </header>

            <div className="relative z-20 border-b border-backgroundContrast bg-background text-black">
                <Container className="flex min-h-[--header-row-height] items-center justify-center">
                    <a
                        href="#"
                        onClick={() => setActiveComponent('Editorial')}
                        className="flex h-[--header-row-height] items-center"
                    ></a>
                    <div className="flex h-[--header-row-height] items-center">
                        <nav className="flex space-x-2 sm:space-x-4 md:space-x-5 lg:space-x-10">
                            <Hoverlink
                                href="#Editorial"
                                onClick={() => setActiveComponent('Editorial')}
                                isActive={activeComponent === 'Editorial'}
                                className="tracking-normal font-headers text-lg text-xs font-light sm:text-sm sm:tracking-wide md:text-base md:tracking-wider lg:text-lg"
                            >
                                editorial
                            </Hoverlink>
                            <Hoverlink
                                href="#Factorial"
                                onClick={() => setActiveComponent('Factorial')}
                                isActive={activeComponent === 'Factorial'}
                                className="tracking-normal font-headers text-lg text-xs font-light sm:text-sm sm:tracking-wide md:text-base md:tracking-wider lg:text-lg"
                            >
                                commercial
                            </Hoverlink>
                            <Hoverlink
                                href="#AboutMe"
                                onClick={() => setActiveComponent('AboutMe')}
                                isActive={activeComponent === 'AboutMe'}
                                className="tracking-tight font-headers text-lg text-xs font-light sm:text-sm sm:tracking-wide md:text-base md:tracking-wider lg:text-lg"
                            >
                                about me
                            </Hoverlink>
                        </nav>
                    </div>
                </Container>
            </div>
        </>
    );
};
