import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Editorial_imageSets } from '../../images/index';
import { Collage } from '../utils/collage';

export const Editorial = () => {
    const ref = useRef<HTMLDivElement>(null);
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
                {Editorial_imageSets.map((set, index) => (
                    <Collage
                        key={index}
                        images={set.media}
                        metadata={{
                            title: set.metadata.description,
                            description: set.metadata.subdescription,
                            credits: set.metadata.credits,
                        }}
                        layout={set.metadata.layout}
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
