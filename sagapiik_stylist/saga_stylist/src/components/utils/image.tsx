import { useRef, useState } from 'react';
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
    const ref = useRef(null);

    // Determine if media is a video
    const isVideo = src.endsWith('.mp4');

    // Detect orientation (landscape or portrait)
    const orientation = useOrientation(src);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Define landscape and portrait classes for breakpoints
    const landscapeClass =
        'h-[calc(100vh-var(--header-height))] w-full h-[60vh] w-[80vw] md:h-[30rem] md:w-[53rem] lg:h-[35rem] lg:w-[62.5rem] xl:h-[40rem] xl:w-[71rem]';
    const portraitClass =
        'h-[90svh] w-auto max-h-[70svh] h-full w-[60vw] md:h-[53rem] md:w-[30rem] lg:h-[62.5rem] lg:w-[35rem] xl:h-[71rem] xl:w-[40rem]';

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
                    className={`group relative overflow-hidden bg-white ${orientation === 'landscape' ? landscapeClass : portraitClass}`}
                    onClick={!isVideo ? handleOpenModal : undefined}
                >
                    {isVideo ? (
                        <video
                            src={src}
                            className="absolute left-0 top-0 z-10 h-full w-full object-cover"
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
                            className="absolute left-0 top-0 h-full w-full object-cover"
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
                    <div className="h-1/8 z-5 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 p-2 text-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                        {image?.credits && (
                            <p className="font-headers text-base font-light tracking-widest md:text-xl lg:text-2xl xl:text-3xl">
                                Credits: {image.credits}
                            </p>
                        )}
                        {image?.styling && (
                            <p className="font-headers text-base font-light tracking-widest md:text-xl lg:text-2xl xl:text-3xl">
                                Styling: {image.styling}
                            </p>
                        )}
                        {image?.muah && (
                            <p className="font-headers text-base font-light tracking-widest md:text-xl lg:text-2xl xl:text-3xl">
                                MUAH: {image.muah}
                            </p>
                        )}
                        {image?.photography && (
                            <p className="font-headers text-base font-light tracking-widest md:text-xl lg:text-2xl xl:text-3xl">
                                Photography: {image.photography}
                            </p>
                        )}
                        {image?.videography && (
                            <p className="font-headers text-base font-light tracking-widest md:text-xl lg:text-2xl xl:text-3xl">
                                Videography: {image.videography}
                            </p>
                        )}
                    </div>
                </div>
                <div className="relative mt-5 flex flex-col items-center justify-center">
                    <h2 className="font-headers text-xl font-bold text-backgroundContrast md:text-3xl lg:text-4xl xl:text-5xl">
                        {title}
                    </h2>
                    <p className="xl:text-md font-headers text-xs text-textBlack md:text-sm">
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
