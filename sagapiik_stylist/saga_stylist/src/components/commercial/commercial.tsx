import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Commercial_imageSets } from '../../images/index';
import { Image } from '../utils/image';

export const Commercial = () => {
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
                className="relative h-[calc(100svh-var(--header-height))] snap-y snap-mandatory overflow-y-scroll hover:overflow-y-auto"
            >
                {Commercial_imageSets.map((set, index) => (
                    <div key={index} className="snap-center">
                        <Image
                            src={set.media[0].url}
                            alt={set.media[0].alt}
                            image={set.media[0]}
                            images={set.media}
                            title={set.metadata.description}
                            subtitle={set.metadata.subdescription ?? ''}
                            credits={set.metadata.credits}
                        />
                    </div>
                ))}
            </div>

            <motion.div
                className="fixed bottom-5 left-0 right-0 h-2 bg-black"
                style={{ scaleX }}
            />
        </>
    );
};
