import { useRef, useState } from 'react';
import { Container } from '../container/container';
import { Alt_modal } from './alt_modal';
import { Modal } from './modal'; // secondary option for modal design

export function Image({
    src,
    alt,
    id,
    credits,
    muah,
    images,
    title,
}: {
    src: string;
    alt: string;
    id: number;
    credits: string;
    muah: string;
    images: { url: string; alt: string }[];
    title: string;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ref = useRef(null);

    const positionClass =
        id % 2 === 0
            ? 'md:left-3/4 md:text-left'
            : 'md:right-3/4 md:text-right';

    return (
        <section
            ref={ref}
            className="relative flex h-[calc(100vh-var(--header-height))] snap-center items-center justify-center"
        >
            <Container className="relative flex h-full max-h-[100svh] w-full items-center justify-center">
                <div
                    className="group relative h-96 max-h-[90vh] w-72 cursor-pointer overflow-hidden bg-white md:h-[35rem] md:w-[24rem] lg:h-[40rem] lg:w-[28rem] xl:h-[45rem] xl:w-[32rem]"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                    <div className="h-1/8 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 p-2 text-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                        <p className="font-Saira text-xs font-light tracking-widest md:text-base lg:text-xl xl:text-2xl">
                            📸Credits: {credits}
                        </p>
                        <p className="font-Saira text-xs font-light tracking-widest md:text-base lg:text-xl xl:text-2xl">
                            💄MUAH: {muah}
                        </p>
                    </div>
                </div>
                <div
                    className={`absolute top-[16%] flex flex-col text-center md:top-[50%] ${positionClass}`}
                >
                    <h2 className="text-xl font-bold text-backgroundContrast md:text-3xl lg:text-4xl xl:text-5xl">{`#00${id}`}</h2>
                    <p className="bg-white font-Saira text-xs tracking-wide text-black md:text-sm lg:text-xl xl:text-2xl">
                        3 words about the image
                    </p>
                </div>
            </Container>
            <Alt_modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                images={images}
                title={title}
            />
        </section>
    );
}
