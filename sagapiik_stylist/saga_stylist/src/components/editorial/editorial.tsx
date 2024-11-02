import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Editorial_imageSets } from '../../images/index';
import { Image } from '../utils/image';

const editorialImages = Editorial_imageSets.map((set) => set.media[0]); // Get first media item from each set

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
                {editorialImages.map((image, index) => (
                    <Image
                        key={index}
                        src={image.url}
                        alt={image.alt}
                        id={index + 1}
                        image={image}
                        images={Editorial_imageSets[index].media} // Pass entire media array for modal
                        title={Editorial_imageSets[index].metadata.description} // Access description from metadata
                        subtitle={
                            Editorial_imageSets[index].metadata.subdescription
                        } // Access subtitle from metadata
                        credits={Editorial_imageSets[index].metadata.credits} // Access credits from metadata
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
