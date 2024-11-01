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
                        className="absolute left-0 top-0 h-full w-full rounded-lg object-contain"
                        style={{
                            borderRadius: '5%',
                            maskImage:
                                'radial-gradient(circle at center, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)',
                            WebkitMaskImage:
                                'radial-gradient(circle at center, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)',
                        }}
                    />
                </div>
                <div className="flex w-full flex-col gap-20 p-5 text-center md:w-1/2">
                    <div>
                        <h2 className="font-headers text-2xl font-semibold tracking-widest">
                            About Me
                        </h2>
                        <p className="mt-5 font-headers text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pellentesque vehicula, risus eget imperdiet
                            ullamcorper, lacus augue tempor nisl, in malesuada
                            risus libero ac neque.
                        </p>
                    </div>
                    <div>
                        <p className="font-headers font-bold tracking-widest">
                            <span>Phone:</span>
                            <span>0700 123123</span>
                            <br />
                            <span>Email:</span>
                            <span>SAKARI@bike.fi</span>
                        </p>
                    </div>
                </div>
            </section>

            <section
                ref={containerRef}
                className="relative h-screen w-full overflow-hidden"
            >
                <svg className="absolute left-[40%] top-0 mt-40 h-full w-full">
                    <path d="M24 0q-3.5712 80.1177.4032 156.9601T22.4448 307.8736t2.9952 45.0977-1.2672-12.3452 0 129.4984T26.88 694.1013c-1.728 25.4462-3.3408 54.9234-3.9744 88.1798l2.1888-15.3685c-1.5552 2.2675-2.2464 1.7636-3.456-3.0233l1.2672 18.3918"></path>
                </svg>
                <div className="mt-20 flex flex-col items-center space-y-8 py-10 font-ibm">
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
                                <p className="font-Saira text-2xl font-light">
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
        text: 'This lil bitch was born.',
    },
    {
        year: '2015',
        text: 'Matriculation examination, Kannaksen lukio',
    },
    {
        year: '2017',
        text: 'Fashion marketing, Helsinki design school',
    },
    {
        year: '2020',
        text: 'Saga Piik Styling was founded.',
    },
    {
        year: '2021',
        text: 'Istituto Marangoni Milan, Fashion styling & photography',
    },
    {
        year: 'current',
        text: 'Working girl',
    },
];
