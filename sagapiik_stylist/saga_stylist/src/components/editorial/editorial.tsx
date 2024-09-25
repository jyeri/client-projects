import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { landscape, portrait, square } from '../../../public/images/index';

const imageSets = [landscape, portrait, square];
const firstImages = imageSets.map((set) => set[0]);

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ src, alt, id }: { src: string; alt: string; id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="snap-center flex items-center justify-center h-[calc(100vh-var(--header-height))] relative perspective-500"> {/* Adjust height with header offset */}
      <div ref={ref} className="w-72 h-96 relative max-h-[90vh] overflow-hidden bg-white">
        <img
          src={src}
          alt={alt}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <motion.h2
        style={{ y }}
        className="absolute left-1/2 transform translate-x-[130px] text-5xl font-bold text-white"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}

export const Editorial = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <div ref={ref} className="snap-y snap-mandatory overflow-y-scroll h-[calc(100vh-var(--header-height))]"> {/* Adjust for header height */}
        {firstImages.map((src, index) => (
          <Image key={index} src={src.url} alt={src.alt} id={index + 1} />
        ))}
      </div>
      <motion.div
        className="fixed bottom-5 left-0 right-0 h-2 bg-black"
        style={{ scaleX }}
      />
    </>
  );
};