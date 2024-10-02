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
        const observer = new IntersectionObserver(
            ([entry]) => setIsScrolled(!entry.isIntersecting),
            { threshold: 0 }
        );

        const currentHeaderRef = headerRef.current;
        if (currentHeaderRef) {
            observer.observe(currentHeaderRef);
        }

        // Cleanup function
        return () => {
            if (currentHeaderRef) {
                observer.unobserve(currentHeaderRef);
            }
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
                    <nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-10">
                        <Hoverlink
                            href="#Editorial"
                            onClick={() => setActiveComponent('Editorial')}
                            isActive={activeComponent === 'Editorial'}
                            className="text-xs sm:text-base lg:text-lg"
                        >
                            Editorial
                        </Hoverlink>
                        <Hoverlink
                            href="#Factorial"
                            onClick={() => setActiveComponent('Factorial')}
                            isActive={activeComponent === 'Factorial'}
                            className="text-xs sm:text-base lg:text-lg"
                        >
                            Factorial
                        </Hoverlink>
                        <Animatedlink
                            href="#AboutMe"
                            onClick={() => setActiveComponent('AboutMe')}
                            isActive={activeComponent === 'AboutMe'}
                            className="text-xs sm:text-base lg:text-lg"
                        >
                            About Me
                        </Animatedlink>
                    </nav>
                </Container>
            </header>
            <div className="sticky top-0 z-20 border-b border-backgroundContrast bg-background text-black">
                <Container className="flex min-h-[--header-row-height] items-center justify-between">
                    <a href="#" onClick={() => setActiveComponent('Editorial')}>
                        <p className="font-headers text-2xl font-semibold tracking-widest">
                            SAGA PIIK
                        </p>
                    </a>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isScrolled ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Dropdownmenu setActiveComponent={setActiveComponent} />
                    </motion.div>
                </Container>
            </div>
        </>
    );
};
