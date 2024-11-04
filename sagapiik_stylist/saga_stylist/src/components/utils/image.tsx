import { useRef, useState, useEffect } from 'react';
import { Container } from '../container/container';
import { Modal } from './modal';
import useOrientation from '../hooks/useOrientation';

type ImageProps = {
    src: string;
    alt: string;
    images: { url: string; alt: string }[];
    title: string;
    subtitle?: string;
    credits?: string;
    image?: {
        credits?: string;
        muah?: string;
        photography?: string;
        styling?: string;
        videography?: string;
    };
};

export function Image({
    src,
    alt,
    images,
    title,
    subtitle,
    credits,
    image,
}: ImageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVideoLandscape, setIsVideoLandscape] = useState(true);
    const ref = useRef(null);

    const isVideo = src.endsWith('.mp4');
    const orientation = useOrientation(isVideo ? '' : src);

    useEffect(() => {
        if (isVideo) {
            const videoElement = document.createElement('video');
            videoElement.src = src;
            videoElement.onloadedmetadata = () => {
                setIsVideoLandscape(
                    videoElement.videoWidth > videoElement.videoHeight
                );
            };
        }
    }, [src, isVideo]);

    const handleOpenModal = () => setIsModalOpen(true);

    const landscapeClass =
        'max-h-[50vh] w-full sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[45vw]';
    const portraitClass =
        'w-auto max-h-[65svh] h-auto sm:w-[50vw] md:w-[40vw] lg:w-[35vw] xl:w-[30vw]';

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
                    className={`group relative flex items-center justify-center bg-white ${
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
                    <div className="relative flex h-full w-full items-center justify-center">
                        {isVideo ? (
                            <video
                                src={src}
                                className="h-full w-full object-contain"
                                controls
                                muted
                                loop
                                playsInline
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <img
                                src={src}
                                alt={alt}
                                className="h-full w-full object-contain"
                            />
                        )}

                        {isVideo && (
                            <button
                                className="absolute left-1/2 top-5 z-20 -translate-x-1/2 transform bg-black px-3 py-1 text-sm text-white opacity-60 transition-all duration-300 ease-in-out hover:opacity-100"
                                onClick={handleOpenModal}
                            >
                                More about the project
                            </button>
                        )}

                        {!isVideo && (
                            <div
                                className="absolute bottom-0 flex h-1/2 w-[80%] items-end justify-center bg-gradient-to-t from-black via-black/50 text-center font-headers text-sm font-light tracking-wide text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 sm:text-base"
                                style={{
                                    background:
                                        'radial-gradient(ellipse at bottom, rgba(0, 0, 0, 1), transparent 65%)',
                                }}
                            >
                                <div className="w-[80%] pb-6 md:pb-16">
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
                </div>

                {/* Title positioning */}
                <div className="container-padding relative mt-2 flex flex-col items-center justify-center md:mt-6">
                    <h2 className="font-headers text-lg font-bold text-backgroundContrast sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        {title}
                    </h2>
                    <p className="font-headers text-xs text-textBlack sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        {subtitle}
                    </p>
                </div>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                images={images}
                metadata={metadata}
                selectedIndex={0}
            />
        </section>
    );
}
