import { Container } from '../container/container';
import { Dropdownmenu } from '../utils/dropdown';
import { Animatedlink } from '../utils/animatedlink';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => {
            if (headerRef.current) {
                observer.unobserve(headerRef.current);
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
                        href="/"
                        className="flex h-[--header-row-height] items-center"
                    >
                        <p className="px-10 font-headers text-lg font-light tracking-widest">
                            stylist
                        </p>
                        <span className="sr-only">Back to homepage</span>
                    </a>
                    <nav className="flex space-x-2 sm:space-x-6 md:space-x-10">
                        <Animatedlink
                            className="text-sm uppercase sm:text-base md:text-lg"
                            href="#editorial"
                        >
                            Editorial
                        </Animatedlink>
                        <Animatedlink
                            className="text-sm uppercase sm:text-base md:text-lg"
                            href="#commercial"
                        >
                            Commercial
                        </Animatedlink>
                        <Animatedlink
                            className="text-sm uppercase sm:text-base md:text-lg"
                            href="#about-me"
                        >
                            About Me
                        </Animatedlink>
                    </nav>
                </Container>
            </header>
            <div className="sticky top-0 z-20 border-b-2 border-backgroundContrast bg-background text-black">
                <Container className="flex min-h-[--header-row-height] items-center justify-between">
                    <a href="/">
                        <p className="font-headers text-2xl font-semibold tracking-widest">
                            SAGA PIIK
                        </p>
                    </a>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isScrolled ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Dropdownmenu />
                    </motion.div>
                </Container>
            </div>
        </>
    );
};
