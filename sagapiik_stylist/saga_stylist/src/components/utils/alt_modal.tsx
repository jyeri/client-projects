import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Container } from '../container/container';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    images: { url: string; alt: string }[];
    title: string;
};

export const Alt_modal = ({ isOpen, onClose, images, title }: ModalProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Close modal with ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Modal background */}
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <motion.div
                        className="relative z-10 flex flex-col overflow-hidden rounded-lg bg-white shadow-lg lg:flex-row"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: 50 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <Container className="flex max-h-[75vh] max-w-[75vw] flex-col bg-background px-5 py-10 lg:flex-row">
                            {/* Left section: Title and text */}
                            <div className="flex w-full flex-col justify-between lg:w-1/2">
                                <h1 className="font-headers text-2xl font-medium md:text-3xl lg:text-4xl">
                                    {title}
                                </h1>
                                <div className="mt-5 space-y-4">
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer border-b pb-1 text-xl font-light md:text-2xl ${
                                                index === activeIndex
                                                    ? 'border-black'
                                                    : 'border-backgroundContrast'
                                            }`}
                                        >
                                            <h1
                                                className={`text-xl font-light md:text-2xl ${
                                                    index === activeIndex
                                                        ? 'text-black'
                                                        : 'text-backgroundContrast'
                                                }`}
                                                onClick={() =>
                                                    setActiveIndex(index)
                                                }
                                            >
                                                {image.alt}
                                            </h1>
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height:
                                                        activeIndex === index
                                                            ? 'auto'
                                                            : 0,
                                                    opacity:
                                                        activeIndex === index
                                                            ? 1
                                                            : 0,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: 'easeInOut',
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-sm font-light md:text-base lg:text-lg">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    Explicabo est in,
                                                    consequuntur, eaque
                                                    distinctio dolor adipisci
                                                    quia labore itaque
                                                    perferendis dolorum.
                                                </p>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right section: Image */}
                            <div className="w-full lg:w-1/2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        <img
                                            src={images[activeIndex].url}
                                            alt={images[activeIndex].alt}
                                            className="h-auto w-full rounded-sm object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Close button */}
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
                        </Container>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
