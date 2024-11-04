import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../container/container';
import { Hoverlink } from '../utils/hoverlink';
import { Dropdownmenu } from '../utils/dropdown';
import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

type ComponentType = 'Editorial' | 'Commercial' | 'AboutMe';

interface HeaderProps {
    setActiveComponent: (component: ComponentType) => void;
    activeComponent: ComponentType;
}

export const Header: React.FC<HeaderProps> = ({
    setActiveComponent,
    activeComponent,
}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={twMerge(
                    'sticky top-0 z-50 bg-background text-black',
                    isScrolled ? 'border-b border-backgroundContrast' : ''
                )}
            >
                <Container className="relative flex min-h-[--header-toprow-height] items-center justify-between px-4">
                    <div className="flex-1"></div>

                    <a
                        href="#"
                        onClick={() => setActiveComponent('Editorial')}
                        className="absolute left-1/2 -translate-x-1/2 transform"
                    >
                        <p className="pb-3 pt-6 font-headers text-lg font-semibold tracking-widest sm:text-xl sm:tracking-wide2xl md:text-3.5xl md:tracking-wide3xl">
                            SAGA PIIK
                        </p>
                    </a>

                    {/* Social Icons and Dropdown Menu */}
                    <div className="flex items-center space-x-4 pr-0 sm:pr-2 pt-3">
                        <a
                            href="https://www.instagram.com/stylistsagapiik/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black"
                        >
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="icon-black text-xs sm:text-sm md:text-base"
                            />
                        </a>

                        <a href="#" className="text-black">
                            <FontAwesomeIcon
                                icon={faTiktok}
                                className="icon-black pl-0 sm:pl-2 text-xs sm:text-sm md:text-base"
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
                            href="#Commercial"
                            onClick={() => setActiveComponent('Commercial')}
                            isActive={activeComponent === 'Commercial'}
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
                </Container>
            </div>
        </>
    );
};
