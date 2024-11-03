import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Modal } from './modal';
import { Container } from '../container/container';

type ImageProps = {
    url: string;
    alt: string;
};

type CollageProps = {
    images: ImageProps[];
    metadata?: {
        title: string;
        description?: string;
    };
};

export const Collage = ({ images, metadata }: CollageProps) => {
    const ref = useRef<HTMLElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    return (
        <section
            ref={ref}
            className="relative flex h-[calc(100vh-var(--header-height))] snap-center items-center justify-center"
        >
            <Container className="relative flex h-full max-h-[100svh] w-full flex-col items-center justify-center">
                {metadata && (
                    <h2 className="mb-4 text-center text-xl font-bold">
                        {metadata.title}
                    </h2>
                )}

                {/* Wrap each image set */}
                <div className="collage-grid">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`collage-item ${
                                isLandscape(image) ? 'landscape' : 'portrait'
                            } relative cursor-pointer overflow-hidden rounded-lg`}
                            onClick={() => handleImageClick(index)}
                        >
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && selectedImageIndex !== null && (
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            images={images}
                            metadata={{
                                description: metadata?.description,
                                credits: images[selectedImageIndex]?.alt,
                            }}
                            selectedIndex={selectedImageIndex}
                            onNavigate={(index) => setSelectedImageIndex(index)}
                        />
                    )}
                </AnimatePresence>
            </Container>
        </section>
    );
};

// Check for landscape orientation
function isLandscape(image: ImageProps) {
    const img = new Image();
    img.src = image.url;
    return img.width > img.height;
}