import { Container } from '../container/container';
import { Dropdownmenu } from '../utils/dropdown';
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
      <header ref={headerRef} className="relative z-20 bg-background text-black">
        <Container className="flex min-h-[--header-row-height] items-center justify-between">
          <a href="/" className="flex h-[--header-row-height] items-center">
            <p className='px-10 font-light text-lg tracking-widest font-headers'>stylist</p>
            <span className="sr-only">Back to homepage</span>
          </a>
          <nav className="flex space-x-16">
            <a href="#editorial" className="font-headers text-lg">Editorial</a>
            <a href="#commercial" className="font-headers text-lg">Commercial</a>
            <a href="#about-me" className="font-headers text-lg">About Me</a>
          </nav>
        </Container>
      </header>
      <div className="sticky top-0 z-20 bg-background text-black border-b-2 border-backgroundContrast">
        <Container className="flex min-h-[--header-row-height] items-center justify-between">
          <a href='/'>
            <p className="text-2xl tracking-widest font-semibold font-headers">SAGA PIIK</p>
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