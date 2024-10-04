import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../container/container';
import { Hoverlink } from '../utils/hoverlink';
import { Animatedlink } from '../utils/animatedlink';
import { Dropdownmenu } from '../utils/dropdown';

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
            console.log('Scrolled:', scrolled); // Add this to debug
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
                className="relative z-20 bg-background text-black"
            >
                <Container className="flex min-h-[--header-row-height] items-center justify-between">
                    <a
                        href="#"
                        onClick={() => setActiveComponent('Editorial')}
                        className="flex h-[--header-row-height] items-center"
                    >
                        <p className="xs:px-10 px-2 font-headers text-lg font-light tracking-widest">
                            stylist
                        </p>
                    </a>
                    <div className="flex h-[--header-row-height] items-center">
                        <nav className="mt-1 flex space-x-2 sm:mt-3 sm:space-x-4 md:mt-4 md:space-x-8 lg:space-x-10">
                            <Hoverlink
                                href="#Editorial"
                                onClick={() => setActiveComponent('Editorial')}
                                isActive={activeComponent === 'Editorial'}
                                className="font-headers text-lg text-xs font-light tracking-normal sm:tracking-wide md:text-base md:tracking-widest lg:text-lg"
                            >
                                Editorial
                            </Hoverlink>
                            <Hoverlink
                                href="#Factorial"
                                onClick={() => setActiveComponent('Factorial')}
                                isActive={activeComponent === 'Factorial'}
                                className="font-headers text-lg text-xs font-light tracking-normal sm:tracking-wide md:text-base md:tracking-widest lg:text-lg"
                            >
                                Factorial
                            </Hoverlink>
                            <Animatedlink
                                href="#AboutMe"
                                onClick={() => setActiveComponent('AboutMe')}
                                isActive={activeComponent === 'AboutMe'}
                                className="font-headers text-lg text-xs font-light tracking-normal sm:tracking-wide md:text-base md:tracking-widest lg:text-lg"
                            >
                                About Me
                            </Animatedlink>
                        </nav>
                    </div>
                </Container>
            </header>

            <div className="sticky top-0 z-50 border-b border-backgroundContrast bg-background text-black">
                <Container className="flex min-h-[--header-row-height] items-center justify-between">
                    <a href="#" onClick={() => setActiveComponent('Editorial')}>
                        <p className="font-headers text-2xl font-semibold tracking-widest">
                            SAGA PIIK
                        </p>
                    </a>
                    {isScrolled && (
                        <>
                            {console.log('Dropdown visible')}{' '}
                            {/* Add this for debugging */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="visible z-50"
                            >
                                <Dropdownmenu
                                    setActiveComponent={setActiveComponent}
                                />
                            </motion.div>
                        </>
                    )}
                </Container>
            </div>
        </>
    );
};
