import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { landscape, portrait, square } from '../../images/index';
import { Image } from '../utils/image';

const imageSets = [landscape, portrait, square];

export const Editorial = () => {
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
                {imageSets.map((imageSet, index) => {
                    const firstImage = imageSet[0]; // Extract the first image from each set
                    return (
                        <Image
                            key={index}
                            src={firstImage.url}
                            alt={firstImage.alt}
                            credits={firstImage.credits}
                            muah={firstImage.muah}
                            id={index + 1}
                            images={imageSet} // Pass the entire image set for the modal slider
                            title={`Image Set ${index + 1}`}
                        />
                    );
                })}
            </div>
            <motion.div
                className="fixed bottom-5 left-0 right-0 h-2 bg-black"
                style={{ scaleX }}
            />
        </>
    );
};
