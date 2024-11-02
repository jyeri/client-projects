import { useRef, useState, useEffect } from 'react';
import { Container } from '../container/container';
import { Modal } from './modal';
import useOrientation from '../hooks/useOrientation';

export function Image({
    src,
    alt,
    image,
    images,
    title,
    subtitle,
    credits,
}: {
    src: string;
    alt: string;
    id: number;
    image?: {
        credits?: string;
        muah?: string;
        photography?: string;
        styling?: string;
        videography?: string;
    };
    images: { url: string; alt: string }[];
    title: string;
    subtitle?: string;
    credits?: string;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVideoLandscape, setIsVideoLandscape] = useState(true); // Default to landscape for videos
    const ref = useRef(null);

    // Determine if media is a video
    const isVideo = src.endsWith('.mp4');

    // Detect orientation for images
    const orientation = useOrientation(isVideo ? '' : src);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (isVideo) {
            const videoElement = document.createElement('video');
            videoElement.src = src;

            // Set orientation based on video metadata
            videoElement.onloadedmetadata = () => {
                setIsVideoLandscape(
                    videoElement.videoWidth > videoElement.videoHeight
                );
            };
        }
    }, [src, isVideo]);

    // Define landscape and portrait classes for breakpoints
    const landscapeClass =
        'h-[calc(100vh-var(--header-height))] w-full h-[60vh] w-[80vw] md:h-[30rem] md:w-[53rem] lg:h-[35rem] lg:w-[62.5rem] xl:h-[40rem] xl:w-[71rem]';
    const portraitClass =
        'h-[90svh] w-auto max-h-[70svh] h-full w-full md:h-[53rem] md:w-[30rem] lg:h-[62.5rem] lg:w-[35rem] xl:h-[71rem] xl:w-[40rem]';

    // Prepare metadata for modal
    const metadata = {
        description: title,
        subdescription: subtitle,
        credits: credits || image?.credits,
    };

    return (
        <section
            ref={ref}
            className="relative flex h-[calc(100vh-var(--header-height))] snap-center items-center justify-center"
        >
            <Container className="relative flex h-full max-h-[100svh] w-full flex-col items-center justify-center">
                <div
                    className={`group relative overflow-hidden bg-white ${
                        isVideo
                            ? isVideoLandscape
                                ? landscapeClass
                                : portraitClass
                            : orientation === 'landscape'
                              ? landscapeClass
                              : portraitClass
                    }`}
                    onClick={!isVideo ? handleOpenModal : undefined}
                >
                    {isVideo ? (
                        <video
                            src={src}
                            className="absolute left-0 top-0 z-10 h-full w-full object-contain"
                            controls
                            muted
                            loop
                            playsInline
                            onClick={(e) => e.stopPropagation()} // Prevent modal opening from controls
                        />
                    ) : (
                        <img
                            src={src}
                            alt={alt}
                            className="absolute left-0 top-0 h-full w-full object-contain"
                        />
                    )}

                    {/* View Details Button only for videos */}
                    {isVideo && (
                        <button
                            className="absolute left-1/2 top-5 z-20 -translate-x-1/2 transform bg-black px-3 py-1 text-sm text-white opacity-60 transition-all duration-300 ease-in-out hover:opacity-100"
                            onClick={handleOpenModal}
                        >
                            More Details
                        </button>
                    )}

                    {/* Credits Overlay */}
                    {!isVideo && (
                        <div
                            className="absolute bottom-0 left-1/2 flex h-1/2 w-[80%] -translate-x-1/2 transform items-center justify-center text-center font-headers text-base font-light tracking-wide text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                            style={{
                                background:
                                    'radial-gradient(ellipse at bottom, rgba(0, 0, 0, 0.8), transparent 65%)',
                            }}
                        >
                            <div>
                                {image?.styling && (
                                    <p>Styling: {image.styling}</p>
                                )}
                                {image?.muah && <p>MUAH: {image.muah}</p>}
                                {image?.credits && <p>{image.credits}</p>}
                                {image?.photography && (
                                    <p>Photography: {image.photography}</p>
                                )}
                                {image?.videography && (
                                    <p>Videography: {image.videography}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative mt-5 flex flex-col items-center justify-center">
                    <h2 className="font-headers text-xl font-bold text-backgroundContrast md:text-2xl lg:text-3xl xl:text-4xl">
                        {title}
                    </h2>
                    <p className="font-headers text-xs text-textBlack md:text-base xl:text-xl">
                        {subtitle}
                    </p>
                </div>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                images={images} // Pass images to Modal
                metadata={metadata} // Pass metadata to Modal
            />
        </section>
    );
}
