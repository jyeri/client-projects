import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '../container/container';

export const Aboutme = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll(); // Listen to body scroll instead of container scroll

    // Scaling and opacity effect for timeline items
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <Container>
            {/* First Section - Image and Text */}
            <section className="flex flex-col items-center justify-between p-10 md:flex-row">
                <div className="w-full md:w-1/2">
                    <img
                        src="/public/images/ph_aboutme/aboutme_ph.png"
                        alt="About Me"
                        className="h-auto w-full"
                    />
                </div>
                <div className="w-full p-5 md:w-1/2">
                    <h2 className="font-headers text-3xl font-bold">
                        About Me
                    </h2>
                    <p className="mt-5 font-headers text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque vehicula, risus eget imperdiet ullamcorper,
                        lacus augue tempor nisl, in malesuada risus libero ac
                        neque.
                    </p>
                </div>
            </section>

            {/* Second Section - Timeline */}
            <section
                ref={containerRef}
                className="relative h-screen overflow-hidden"
            >
                {/* Wavy Arrow - Using Tailwind CSS for visualization */}
                <div className="pointer-events-none absolute inset-0 flex justify-center">
                    <div className="h-full w-2 bg-black bg-[repeating-linear-gradient(transparent_0px,transparent_20px,black_20px,black_40px)]"></div>
                </div>

                {/* Timeline Items */}
                <div className="timeline-items flex flex-col items-center space-y-20 py-10">
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="timeline-item flex w-full items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            {/* Alternating Year and Paragraph */}
                            <div
                                className={`w-1/2 p-5 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                            >
                                <p className="text-2xl font-bold">
                                    {item.year}
                                </p>
                                <p>{item.text}</p>
                            </div>
                            <div className={`w-1/2 p-5 text-left`}>
                                <p>{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </Container>
    );
};

// Sample timeline data for demonstration
const timelineData = [
    {
        year: '2020',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    { year: '2021', text: 'Pellentesque vehicula risus eget imperdiet.' },
    {
        year: '2022',
        text: 'Fusce aliquet lorem id purus ullamcorper, et venenatis erat.',
    },
    {
        year: '2023',
        text: 'Integer feugiat sapien nec facilisis pellentesque.',
    },
];
