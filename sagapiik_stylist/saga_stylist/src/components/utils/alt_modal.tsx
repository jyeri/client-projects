import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback } from 'react';

type Media = {
    url: string;
    alt: string;
};

type Metadata = {
    description?: string;
    subdescription?: string;
    credits?: string;
};

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    images: Media[];
    metadata: Metadata;
};

export const Modal = ({ isOpen, onClose, images, metadata }: ModalProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const isVideo = (url: string) => url.endsWith('.mp4');

    const nextMedia = useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! + 1) % images.length);
        }
    }, [selectedIndex, images.length]);

    const prevMedia = useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex(
                (prev) => (prev! - 1 + images.length) % images.length
            );
        }
    }, [selectedIndex, images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && selectedIndex !== null) nextMedia();
            if (e.key === 'ArrowLeft' && selectedIndex !== null) prevMedia();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, selectedIndex, nextMedia, prevMedia]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <motion.div
                        className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={onClose}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="relative z-50 h-[90vh] w-[90vw] overflow-y-auto rounded-lg bg-white p-8 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            {/* Close Button */}
                            <button
                                className="text-gray-700 hover:text-gray-900 absolute right-6 top-4 text-2xl font-bold"
                                onClick={onClose}
                            >
                                &times;
                            </button>

                            {/* Title and Metadata */}
                            <div className="mb-6 text-center">
                                <h2 className="font-headers text-2xl uppercase md:text-3xl lg:text-4xl">
                                    {metadata?.description}
                                </h2>
                                <div className="text-gray-700 mt-2 font-headers text-sm md:text-base lg:text-lg">
                                    {metadata?.subdescription && (
                                        <p>{metadata.subdescription}</p>
                                    )}
                                    {metadata?.credits && (
                                        <p className="italic">
                                            {metadata.credits}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Media Flex Grid */}
                            <div className="flex flex-wrap justify-center gap-4 p-4">
                                {images.map((media, index) => (
                                    <div
                                        key={index}
                                        className="relative h-[60vh] w-[48%] flex-shrink-0 cursor-pointer overflow-hidden md:w-[48%] lg:w-[45%]"
                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        {isVideo(media.url) ? (
                                            <>
                                                <video
                                                    src={media.url}
                                                    className="h-full w-full object-cover"
                                                    muted
                                                    loop
                                                />
                                                {/* Play Icon Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                    <div className="flex h-16 w-16 items-center justify-center">
                                                        <FontAwesomeIcon
                                                            icon={faCirclePlay}
                                                            className="icon-white rounded-full bg-black"
                                                            size="4x"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <img
                                                src={media.url}
                                                alt={media.alt}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Media Preview Overlay */}
                    {selectedIndex !== null && (
                        <motion.div
                            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedIndex(null)}
                        >
                            {isVideo(images[selectedIndex].url) ? (
                                <motion.video
                                    src={images[selectedIndex].url}
                                    controls
                                    autoPlay
                                    muted
                                    className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <motion.img
                                    src={images[selectedIndex].url}
                                    alt={images[selectedIndex].alt}
                                    className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}

                            {/* Navigation Buttons */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevMedia();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 transform p-2 text-3xl text-white"
                            >
                                &#10094;
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextMedia();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 transform p-2 text-3xl text-white"
                            >
                                &#10095;
                            </button>
                            <button
                                className="hover:text-gray-400 absolute right-6 top-4 text-2xl font-bold text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex(null);
                                }}
                            >
                                &times;
                            </button>
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
};
