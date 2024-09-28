import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { landscape, portrait, square } from '../../images/index';
import { Image } from '../utils/image';

const imageSets = [landscape, portrait, square];
const firstImages = imageSets.map((set) => set[1]);

export const Factorial = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ container: ref });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            <div
                ref={ref}
                className="h-[calc(100vh-var(--header-height))] snap-y snap-mandatory overflow-y-scroll"
            >
                {firstImages.map((src, index) => (
                    <Image
                        key={index}
                        src={src.url}
                        alt={src.alt}
                        credits={src.credits}
                        muah={src.muah}
                        id={index + 1}
                    />
                ))}
            </div>
            <motion.div
                className="fixed bottom-5 left-0 right-0 h-2 bg-black"
                style={{ scaleX }}
            />
        </>
    );
};
