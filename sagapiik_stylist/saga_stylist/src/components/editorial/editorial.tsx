import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { landscape, portrait, square } from '../../../public/images/index'; // Adjust the import path as needed
import { Container } from '../container/container';

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ url, alt }: { url: string; alt: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <div>
            <Container className="mt-[--header-row-height-border] h-[100svh] bg-backgroundContrast">
                <section className="custom-perspective relative flex h-full snap-center items-center justify-center">
                    <div
                        ref={ref}
                        className="relative m-4 h-96 max-h-[95svh] w-72 overflow-hidden bg-white"
                    >
                        <img
                            src={url}
                            alt={alt}
                            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
                        />
                    </div>
                    <motion.h2
                        style={{ y }}
                        className="absolute left-[calc(50%+130px)] text-4xl font-bold text-[red]"
                    >
                        {alt}
                    </motion.h2>
                </section>
            </Container>
        </div>
    );
}

export function Editorial() {
    const imageSets = [landscape, portrait, square];
    const firstImages = imageSets.map((set) => set[0]);

    return (
        <div className="editorial-scroll-container h-[100svh] snap-y snap-mandatory overflow-y-scroll">
            {firstImages.map((image, index) => (
                <Image key={index} url={image.url} alt={image.alt} />
            ))}
        </div>
    );
}
