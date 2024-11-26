import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
    selectedIndex,
}: ModalProps) => {
    const [previewIndex, setPreviewIndex] = useState<number | null>(
        selectedIndex
    ); // Initialize with selectedIndex

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
        if (isOpen) {
            setPreviewIndex(selectedIndex); // Set the preview index to the selected index when the modal opens
        }
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
                                    className="icon-white text-base md:text-xl lg:text-2xl"
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
                                    className="icon-white text-base md:text-xl lg:text-2xl"
                                />
                            </button>
                            <button
                                className="hover:text-gray-400 absolute right-6 top-4 text-2xl font-bold text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose(); // Close the modal directly
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
