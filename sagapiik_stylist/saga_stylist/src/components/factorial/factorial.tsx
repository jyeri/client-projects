import { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from 'framer-motion';
import { landscape, portrait, square } from '../../../public/images/index';

const imageSets = [landscape, portrait, square];
const firstImages = imageSets.map((set) => set[1]);

// Parallax effect helper
function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ src, alt, id }: { src: string; alt: string; id: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, container: ref }); // Correctly link scroll to each image
    const y = useParallax(scrollYProgress, 150); // Parallax effect for vertical motion of the text

    return (
        <section
            ref={ref}
            className="perspective-500 relative flex h-[calc(100vh-var(--header-height))] snap-center items-center justify-center"
        >
            <div className="relative h-96 max-h-[90vh] w-72 overflow-hidden bg-white">
                <img
                    src={src}
                    alt={alt}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                />
            </div>
            <motion.h2
                style={{ y }} // Parallax effect on the text
                className="text-red absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold" // Centered text
            >
                {`#00${id}`}
            </motion.h2>
        </section>
    );
}

export const Factorial = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ container: ref }); // Ensure scroll progress tracks correctly
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            <div
                ref={ref}
                className="h-[calc(100vh-var(--header-height))] snap-y snap-mandatory overflow-y-scroll" // Adjust for header height
            >
                {firstImages.map((src, index) => (
                    <Image
                        key={index}
                        src={src.url}
                        alt={src.alt}
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
