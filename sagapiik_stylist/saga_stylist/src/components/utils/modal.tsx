import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCirclePlay,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    images: { url: string; alt: string }[];
    metadata: {
        description?: string;
        subdescription?: string;
        credits?: string;
    };
    selectedIndex: number;
};

export const Modal = ({
    isOpen,
    onClose,
    images,
    metadata,
    selectedIndex,
}: ModalProps) => {
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const isVideo = (url: string) => url.endsWith('.mp4');

    const handleNext = useCallback(() => {
        setPreviewIndex((prevIndex) => (prevIndex! + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setPreviewIndex(
            (prevIndex) => (prevIndex! - 1 + images.length) % images.length
        );
    }, [images.length]);

    useEffect(() => {
        if (isOpen && imageRefs.current[selectedIndex]) {
            imageRefs.current[selectedIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
        setPreviewIndex(null); // Reset preview on modal open
    }, [isOpen, selectedIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && previewIndex !== null) handleNext();
            if (e.key === 'ArrowLeft' && previewIndex !== null) handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, previewIndex, handleNext, handlePrev]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
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

                        <motion.div
                            className="relative z-10 mb-10 mt-[--header-height] h-[85svh] w-[90vw] max-w-5xl overflow-y-auto rounded-sm bg-white shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            {/* Sticky Header Section */}
                            <div className="sticky top-0 z-50 bg-white p-4">
                                <button
                                    className="text-gray-700 hover:text-gray-900 absolute right-6 top-4 text-2xl font-bold"
                                    onClick={onClose}
                                >
                                    &times;
                                </button>

                                <div className="mb-6 text-center">
                                    <h2 className="font-headers text-2xl uppercase tracking-wider md:text-2xl lg:text-3xl">
                                        {metadata.description}
                                    </h2>
                                    <div className="text-gray-700 mt-1 font-headers text-sm md:text-base lg:text-lg">
                                        {metadata.subdescription && (
                                            <p>{metadata.subdescription}</p>
                                        )}
                                        {metadata.credits && (
                                            <p className="mt-5 italic">
                                                {metadata.credits}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Media List */}
                            <div className="relative mt-4 space-y-8 p-4 pt-20">
                                {' '}
                                {/* Add padding-top here */}
                                {images.map((media, index) => (
                                    <div
                                        key={index}
                                        ref={(el) =>
                                            (imageRefs.current[index] = el)
                                        }
                                        className="group relative cursor-pointer"
                                        onClick={() => setPreviewIndex(index)}
                                    >
                                        {isVideo(media.url) ? (
                                            <div className="relative">
                                                <video
                                                    src={media.url}
                                                    className="h-auto max-h-[80vh] w-full object-contain"
                                                    muted
                                                    loop
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                    <FontAwesomeIcon
                                                        icon={faCirclePlay}
                                                        className="icon-white"
                                                        size="3x"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={media.url}
                                                alt={media.alt}
                                                className="h-auto max-h-[80vh] w-full object-contain"
                                            />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                            <span className="font-headers text-lg uppercase text-white">
                                                Open in Preview
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Full-Screen Preview */}
                    {previewIndex !== null && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPreviewIndex(null)}
                        >
                            {isVideo(images[previewIndex].url) ? (
                                <video
                                    src={images[previewIndex].url}
                                    controls
                                    autoPlay
                                    className="max-h-[90vh] max-w-[90vw] object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <img
                                    src={images[previewIndex].url}
                                    alt={images[previewIndex].alt}
                                    className="max-h-[90vh] max-w-[90vw] object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrev();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-3xl text-white"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="icon-white"
                                />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-3xl text-white"
                            >
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="icon-white"
                                />
                            </button>
                            <button
                                className="hover:text-gray-400 absolute right-6 top-4 text-2xl font-bold text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewIndex(null);
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
