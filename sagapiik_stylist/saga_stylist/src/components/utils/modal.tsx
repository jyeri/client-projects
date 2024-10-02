import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    images: { url: string; alt: string }[];
    title: string;
};

export const Modal = ({ isOpen, onClose, images, title }: ModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const nextImage = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    const prevImage = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage();
            else if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextImage, prevImage]);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    const imageVariants = {
        initial: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
        }),
        animate: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative z-10 flex h-[80svh] w-[80svw] max-w-5xl flex-col items-center rounded-lg bg-white p-5"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: 50 }}
                    >
                        <div className="mb-10 text-center">
                            <h2 className="font-headers text-xl uppercase md:text-2xl lg:text-3xl">
                                {title}
                            </h2>
                            <p className="mt-2 font-headers text-xs md:text-sm lg:text-base">
                                This is placeholder text for the modal. Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Pellentesque vehicula risus eget
                                imperdiet.
                            </p>
                        </div>

                        <div className="relative flex h-3/4 w-full items-center justify-center overflow-hidden">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.img
                                    key={currentImage.url}
                                    src={currentImage.url}
                                    alt={currentImage.alt}
                                    custom={direction}
                                    variants={imageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="absolute h-full w-auto object-cover"
                                />
                            </AnimatePresence>

                            <motion.button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 transform p-2 text-3xl text-backgroundContrast shadow"
                            >
                                &#10094;
                            </motion.button>

                            <motion.button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 transform p-2 text-3xl text-backgroundContrast shadow"
                            >
                                &#10095;
                            </motion.button>
                        </div>

                        <motion.button
                            className="absolute right-6 top-2 text-2xl font-bold"
                            onClick={onClose}
                            whileHover={{
                                scale: 1.5,
                                transition: { duration: 0.3 },
                            }}
                        >
                            &times;
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
