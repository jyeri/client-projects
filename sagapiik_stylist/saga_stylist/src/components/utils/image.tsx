import { useRef, useState, useEffect } from 'react';
import { Container } from '../container/container';
import { Modal } from './modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import useOrientation from '../hooks/useOrientation';

type ImageProps = {
    src: string;
    alt: string;
    metadata: {
        description?: string;
        subdescription?: string;
        credits?: string;
    };
    images: {
        url: string;
        alt: string;
        styling?: string;
        muah?: string;
        credits?: string;
        photography?: string;
        videography?: string;
    }[];
};

export function Image({ images, metadata }: ImageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVideoLandscape, setIsVideoLandscape] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);

    const isVideo = (url: string) => url.endsWith('.mp4');
    const orientation = useOrientation(
        isVideo(images[currentIndex].url) ? '' : images[currentIndex].url
    );

    useEffect(() => {
        if (isVideo(images[currentIndex].url)) {
            const videoElement = document.createElement('video');
            videoElement.src = images[currentIndex].url;
            videoElement.onloadedmetadata = () => {
                setIsVideoLandscape(
                    videoElement.videoWidth > videoElement.videoHeight
                );
            };
        }
    }, [currentIndex, images]);

    const handleOpenModal = () => setIsModalOpen(true);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const landscapeClass =
        'max-h-[50vh] w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw]';
    const portraitClass =
        'w-auto max-h-[65svh] h-auto sm:w-[50vw] md:w-[40vw] lg:w-[35vw] xl:w-[30vw]';

    return (
        <section
            ref={ref}
            className="relative flex h-[calc(100vh-var(--header-height))] snap-center items-center justify-center"
        >
            <Container className="relative flex h-full max-h-[100svh] w-full flex-col items-center justify-center">
                <div
                    className={`group relative flex items-center justify-center bg-white ${
                        isVideo(images[currentIndex].url)
                            ? isVideoLandscape
                                ? landscapeClass
                                : portraitClass
                            : orientation === 'landscape'
                              ? landscapeClass
                              : portraitClass
                    }`}
                    onClick={
                        !isVideo(images[currentIndex].url)
                            ? handleOpenModal
                            : undefined
                    }
                >
                    <div className="relative flex h-full w-full items-center justify-center">
                        {isVideo(images[currentIndex].url) ? (
                            <video
                                src={`${images[currentIndex].url}#t=0.001`}
                                className="h-full w-full object-contain"
                                controls
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <img
                                src={images[currentIndex].url}
                                alt={images[currentIndex].alt}
                                className="h-full w-full object-contain"
                            />
                        )}

                        {!isVideo(images[currentIndex].url) && (
                            <div
                                className="absolute bottom-0 flex h-1/2 w-[80%] items-end justify-center bg-gradient-to-t from-black via-black/50 text-center font-headers text-sm font-light tracking-wide text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 sm:text-base"
                                style={{
                                    background:
                                        'radial-gradient(ellipse at bottom, rgba(0, 0, 0, 1), transparent 65%)',
                                }}
                            >
                                <div className="w-[80%] pb-6 md:pb-16">
                                    {images[currentIndex].styling && (
                                        <p>
                                            Styling:{' '}
                                            {images[currentIndex].styling}
                                        </p>
                                    )}
                                    {images[currentIndex].muah && (
                                        <p>MUAH: {images[currentIndex].muah}</p>
                                    )}
                                    {images[currentIndex].credits && (
                                        <p>{images[currentIndex].credits}</p>
                                    )}
                                    {images[currentIndex].photography && (
                                        <p>
                                            Photography:{' '}
                                            {images[currentIndex].photography}
                                        </p>
                                    )}
                                    {images[currentIndex].videography && (
                                        <p>
                                            Videography:{' '}
                                            {images[currentIndex].videography}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="arrow-button absolute left-4 top-1/2 -translate-y-1/2 transform lg:left-12 xl:left-24"
                            aria-label="Previous"
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="icon-black text-sm md:text-base lg:text-xl"
                            />
                        </button>
                        <button
                            onClick={handleNext}
                            className="arrow-button absolute right-4 top-1/2 -translate-y-1/2 transform lg:right-12 xl:right-24"
                            aria-label="Next"
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="icon-black text-sm md:text-base lg:text-xl"
                            />
                        </button>
                    </>
                )}

                {/* Title positioning */}
                <div className="container-padding relative mt-2 flex flex-col items-center justify-center md:mt-6">
                    <h2 className="text-responsive-title relative w-full text-center font-headers font-bold tracking-wide text-textBlack uppercase">
                        {metadata.description}
                    </h2>
                    <p className="text-responsive-description relative w-full p-2 text-center font-headers font-bold tracking-wider text-backgroundContrast">
                        {metadata.subdescription}
                    </p>
                </div>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                images={images}
                metadata={metadata}
                selectedIndex={currentIndex}
            />
        </section>
    );
}
