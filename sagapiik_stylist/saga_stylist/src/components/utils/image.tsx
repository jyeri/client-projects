import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export function Image({
    src,
    alt,
    id,
    credits,
    muah,
}: {
    src: string;
    alt: string;
    id: number;
    credits: string;
    muah: string;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, container: ref });
    const y = useParallax(scrollYProgress, 150);

    return (
        <section
            ref={ref}
            className="perspective-500 relative flex h-[calc(100vh-var(--header-height))] snap-center items-center justify-center"
        >
            <div className="group relative h-96 max-h-[90vh] w-72 overflow-hidden bg-white">
                <img
                    src={src}
                    alt={alt}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                />
                <div className="to-transparent absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-black via-black/50 p-2 text-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <p className="text-sm">Credits: {credits}</p>
                    <p className="text-sm">MUAH: {muah}</p>
                </div>
            </div>
            <motion.h2
                style={{ y }}
                className="text-red absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold"
            >
                {`#00${id}`}
            </motion.h2>
        </section>
    );
}
