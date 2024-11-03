import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../container/container';
import { Hoverlink } from '../utils/hoverlink';
import { Dropdownmenu } from '../utils/dropdown';
import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

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
                <Container className="relative flex min-h-[--header-toprow-height] items-center justify-between px-4">
                    {/* Invisible spacer div to maintain header alignment */}
                    <div className="flex-1"></div>

                    {/* Centered header text */}
                    <a
                        href="#"
                        onClick={() => setActiveComponent('Editorial')}
                        className="absolute left-1/2 -translate-x-1/2 transform"
                    >
                        <p className="pb-3 pt-6 font-headers text-sm font-semibold tracking-wide sm:text-xl sm:tracking-wide2xl md:text-3.5xl md:tracking-wide3xl">
                            SAGA PIIK
                        </p>
                    </a>

                    {/* Social icons and dropdown menu on the right */}
                    <div className="flex items-center space-x-4 pr-2 pt-3">
                        <a
                            className="text-black"
                            href="https://www.instagram.com/stylistsagapiik/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="icon-black text-sm sm:text-base"
                            />
                        </a>

                        <a className="text-black" href="#">
                            <FontAwesomeIcon
                                icon={faTiktok}
                                className="icon-black pl-2 text-sm sm:text-base"
                            />
                        </a>

                        {isScrolled && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Dropdownmenu
                                    setActiveComponent={setActiveComponent}
                                />
                            </motion.div>
                        )}
                    </div>
                </Container>
            </header>

            <div className="relative z-20 border-b border-backgroundContrast bg-background text-black">
                <Container className="flex min-h-[--header-botrow-height] items-center justify-center">
                    <a
                        href="#"
                        onClick={() => setActiveComponent('Editorial')}
                        className="flex h-[--header-botrow-height] items-center"
                    ></a>
                    <div className="flex h-[--header-botrow-height] items-center">
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
