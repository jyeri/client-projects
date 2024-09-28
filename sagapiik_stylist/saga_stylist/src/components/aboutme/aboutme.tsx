import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '../container/container';
import { aboutmeImage } from '../../images/index';

export const Aboutme = () => {
    const containerRef = useRef(null);

    return (
        <Container>
            <section className="flex flex-col items-center justify-between p-10 md:flex-row">
                <div className="relative aspect-square w-full overflow-hidden md:w-1/2">
                    <img
                        src={aboutmeImage.url}
                        alt={aboutmeImage.alt}
                        className="absolute left-0 top-0 h-full w-full rounded-lg object-cover"
                        style={{
                            borderRadius: '50%',
                            maskImage:
                                'radial-gradient(circle at center, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 100%)',
                            WebkitMaskImage:
                                'radial-gradient(circle at center, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 100%)',
                        }}
                    />
                </div>
                <div className="w-full p-5 text-center md:w-1/2">
                    <h2 className="font-headers text-2xl font-semibold tracking-widest">
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

            <section
                ref={containerRef}
                className="relative h-screen w-full overflow-hidden"
            >
                <svg className="absolute left-[40%] top-0 mt-40 h-full w-full">
                    <path d="M24 0q-3.5712 80.1177.4032 156.9601T22.4448 307.8736t2.9952 45.0977-1.2672-12.3452 0 129.4984T26.88 694.1013c-1.728 25.4462-3.3408 54.9234-3.9744 88.1798l2.1888-15.3685c-1.5552 2.2675-2.2464 1.7636-3.456-3.0233l1.2672 18.3918"></path>
                </svg>
                <div className="mt-20 flex flex-col items-center space-y-20 py-10 font-ibm">
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex w-full items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <div className="w-1/2 p-5 text-center">
                                <p className="text-2xl font-bold">
                                    {item.year}
                                </p>
                            </div>
                            <div className="w-1/2 p-5">
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
        year: '1996',
        text: 'This muffin was taken out of moms tummy.',
    },
    {
        year: '2014',
        text: 'SAGA BIKE ALTEREGO was born.',
    },
    {
        year: '2020',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        year: '2021',
        text: 'Pellentesque vehicula risus eget imperdiet.',
    },
    {
        year: '2022',
        text: 'Fusce aliquet lorem id purus ullamcorper, et venenatis erat.',
    },
    {
        year: '2023',
        text: 'Integer feugiat sapien nec facilisis pellentesque.',
    },
];
