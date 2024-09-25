import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../container/container';
import { Dropdownmenu } from '../utils/dropdown';
import { Animatedlink } from '../utils/animatedlink';

interface HeaderProps {
    setActiveComponent: (component: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ setActiveComponent }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        const currentHeaderRef = headerRef.current;
        if (currentHeaderRef) {
            observer.observe(currentHeaderRef);
        }

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
                        <p className="px-2 font-headers text-lg font-light tracking-widest sm:px-10">
                            stylist
                        </p>
                    </a>
                    <div className="flex h-[--header-row-height] items-center">
                        <nav className="flex space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-10">
                            <Animatedlink
                                href="#Editorial"
                                onClick={() => setActiveComponent('Editorial')}
                                className="text-xs uppercase md:text-base lg:text-lg"
                            >
                                Editorial
                            </Animatedlink>
                            <Animatedlink
                                href="#Factorial"
                                onClick={() => setActiveComponent('Factorial')}
                                className="text-xs uppercase md:text-base lg:text-lg"
                            >
                                Factorial
                            </Animatedlink>
                            <Animatedlink
                                href="#AboutMe"
                                onClick={() => setActiveComponent('AboutMe')}
                                className="text-xs uppercase md:text-base lg:text-lg"
                            >
                                About Me
                            </Animatedlink>
                        </nav>
                    </div>
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
