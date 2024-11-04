import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal } from './modal';
import { Container } from '../container/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

type ImageProps = {
    url: string;
    alt: string;
    credits?: string;
    muah?: string;
    photography?: string;
    styling?: string;
    videography?: string;
};

type CollageProps = {
    images: ImageProps[];
    metadata?: {
        title: string;
        description?: string;
        credits?: string;
    };
};

export const Collage = ({ images, metadata }: CollageProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );
    const [startIndex, setStartIndex] = useState(0);
    const [imagesToShow, setImagesToShow] = useState(4);

    useEffect(() => {
        const updateImagesToShow = () => {
            if (window.innerWidth >= 1024) {
                setImagesToShow(4);
            } else if (window.innerWidth >= 768) {
                setImagesToShow(2);
            } else {
                setImagesToShow(1);
            }
        };
        updateImagesToShow();
        window.addEventListener('resize', updateImagesToShow);
        return () => window.removeEventListener('resize', updateImagesToShow);
    }, []);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const handlePrev = () => {
        setStartIndex(
            (prevIndex) => (prevIndex + imagesToShow) % images.length
        );
    };

    const handleNext = () => {
        setStartIndex(
            (prevIndex) =>
                (prevIndex - imagesToShow + images.length) % images.length
        );
    };

    const displayedImages = images
        .slice(startIndex, startIndex + imagesToShow)
        .concat(
            images.slice(
                0,
                Math.max(0, startIndex + imagesToShow - images.length)
            )
        );

    return (
        <section className="relative flex h-[calc(100svh-var(--header-height))] snap-center items-center justify-center">
            <Container className="relative flex h-full max-h-[100svh] w-full flex-col items-center justify-center">
                {metadata?.title && (
                    <h2 className="relative bottom-3 w-full p-2 text-center font-headers text-base font-bold tracking-wider text-textBlack sm:bottom-4 sm:text-lg md:text-xl lg:text-2xl">
                        {metadata.title}
                    </h2>
                )}
                {metadata?.description && (
                    <h2 className="relative bottom-8 w-full p-2 text-center font-headers text-sm font-bold tracking-wider text-backgroundContrast md:text-base lg:text-xl">
                        {metadata.description}
                    </h2>
                )}

<motion.div
    className="collage-grid mt-16"
    key={startIndex}
    initial={{ opacity: 0.8 }}
    animate={{ opacity: 1 }}
    transition={{ type: 'spring', stiffness: 100 }}
>
    <AnimatePresence mode="wait">
        {displayedImages.map((image, index) => (
            <motion.div
                key={index}
                className="collage-item group relative cursor-pointer"
                onClick={() => handleImageClick(startIndex + index)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut", // Smoother easing function
                    delay: 0.1 // Small delay for exit animation
                }}
            >
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="object-contain"
                                />
                                {image.credits && (
                                    <div className="absolute bottom-0 flex h-1/2 w-full items-center justify-center bg-gradient-to-t from-black via-black/50 text-center font-headers text-sm font-light tracking-wide text-white opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100">
                                        <div className="px-4">
                                            {image.styling && (
                                                <p>
                                                    Styling:{' '}
                                                    <span>{image.styling}</span>
                                                </p>
                                            )}
                                            {image.muah && (
                                                <p>
                                                    MUAH:{' '}
                                                    <span>{image.muah}</span>
                                                </p>
                                            )}
                                            {image.credits && (
                                                <p>
                                                    <span>{image.credits}</span>
                                                </p>
                                            )}
                                            {image.photography && (
                                                <p>
                                                    Photography:{' '}
                                                    <span>
                                                        {image.photography}
                                                    </span>
                                                </p>
                                            )}
                                            {image.videography && (
                                                <p>
                                                    Videography:{' '}
                                                    <span>
                                                        {image.videography}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {images.length > imagesToShow && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="arrow-button absolute left-4 top-1/2 -translate-y-1/2 transform lg:left-24"
                            aria-label="Previous"
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="icon-black text-sm md:text-base lg:text-xl"
                            />
                        </button>
                        <button
                            onClick={handleNext}
                            className="arrow-button absolute right-4 top-1/2 -translate-y-1/2 transform lg:right-24"
                            aria-label="Next"
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="icon-black text-sm md:text-base lg:text-xl"
                            />
                        </button>
                    </>
                )}

                <AnimatePresence>
                    {isModalOpen && selectedImageIndex !== null && (
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            images={images}
                            metadata={{
                                description: metadata?.description,
                                credits: metadata?.credits,
                            }}
                            selectedIndex={selectedImageIndex}
                        />
                    )}
                </AnimatePresence>
            </Container>
        </section>
    );
};
