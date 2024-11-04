import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../container/container';
import { aboutmeImage } from '../../images/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';

export const Aboutme = () => {
    const containerRef = useRef(null);

    return (
        <Container>
            <section className="flex flex-col items-center justify-between p-6 md:flex-row md:gap-12">
                <motion.div
                    className="relative aspect-square h-full w-full overflow-hidden md:w-1/2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <img
                        src={aboutmeImage.url}
                        alt={aboutmeImage.alt}
                        className="absolute left-0 top-0 h-full w-full rounded-lg object-contain shadow-lg"
                        style={{
                            borderRadius: '5%',
                            maskImage:
                                'radial-gradient(circle at center, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)',
                            WebkitMaskImage:
                                'radial-gradient(circle at center, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)',
                        }}
                    />
                </motion.div>
                <div className="flex w-full flex-col gap-8 p-5 text-center md:w-1/2">
                    <div>
                        <h2 className="font-headers text-xl font-semibold tracking-widest md:text-2xl lg:text-3xl">
                            About Me
                        </h2>
                        <p className="mt-5 font-headers text-sm md:text-base lg:text-lg">
                            Hi there! My name is Saga Piik and I am a fashion
                            stylist based in Helsinki. I have background in
                            fashion marketing and I have studied fashion styling
                            and photography in Milan.
                            <br /> <br />
                            How did I end up here? My journey started after
                            graduating from high school in 2015. I have always
                            been interested in fashion and I wanted to learn
                            more about it. I decided to study fashion marketing
                            in Helsinki Design School.
                            <br />
                            After that I worked in retail for a few years and I
                            realized that I wanted to do something more
                            creative. That's when I decided to start my own
                            business. I founded Saga Piik Styling in 2020 and I
                            have been working as a stylist ever since. To
                            further my knowledge in the field, I decided to
                            study fashion styling and photography in Istituto
                            Marangoni Milan.
                            <br /> <br />
                            How could I be in your service? I am available for
                            commercial and editorial projects. I offer styling
                            services for photoshoots, fashion shows, events etc.
                            I can also help you with personal styling and
                            wardrobe consultations.
                            <br />
                            If you are interested in working with me, feel free
                            to contact me. I am looking forward to hearing from
                            you!
                        </p>
                    </div>
                    <div className="rounded-sm border border-[#DADADA] p-4">
                        <p className="font-headers text-base font-bold tracking-widest md:text-lg lg:text-xl">
                            Social channels
                        </p>
                        <div className="mt-5 flex justify-center space-x-4">
                            <motion.a
                                href="https://www.instagram.com/stylistsagapiik/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="icon-black text-base sm:text-xl"
                                />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-black"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FontAwesomeIcon
                                    icon={faTiktok}
                                    className="icon-black pl-2 text-base sm:text-xl"
                                />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={containerRef}
                className="relative mb-10 w-full rounded-sm bg-[#d4c5b9] py-10 text-center"
            >
                <div className="w-full bg-[#d4c5b9] text-center">
                    <span className="font-headers">
                        <h1 className="font-headers text-base font-bold tracking-widest md:text-lg lg:text-xl">
                            Contact Information
                        </h1>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-center gap-2">
                                <FontAwesomeIcon
                                    icon={faGlobe}
                                    className="text-md icon-black sm:text-xl"
                                />
                                <span className="font-headers text-base sm:text-lg">
                                    Helsinki, Finland
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="text-md icon-black sm:text-xl"
                                />
                                <span className="font-headers text-base sm:text-lg">
                                    sagapiik.styling@gmail.com
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="text-md icon-black sm:text-xl"
                                />
                                <span className="font-headers text-base sm:text-lg">
                                    +358 40 123 4567
                                </span>
                            </div>
                        </div>
                    </span>
                </div>
            </section>
        </Container>
    );
};
