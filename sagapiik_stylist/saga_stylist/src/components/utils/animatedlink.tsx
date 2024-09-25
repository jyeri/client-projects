import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type linkProps = {
    children: React.ReactNode;
    href: string;
    onClick: () => void;
    className?: string;
};

export const Animatedlink = ({
    children,
    href,
    onClick,
    className,
}: linkProps) => {
    return (
        <motion.a
            href={href}
            onClick={onClick} // Trigger the onClick event
            className={twMerge(
                'relative block gap-2 overflow-hidden whitespace-nowrap font-headers',
                className
            )}
            initial="initial"
            whileHover="hovered"
            style={{
                lineHeight: '0.8',
            }}
        >
            <div>
                {typeof children === 'string' &&
                    children.split('').map((letter, index) => (
                        <motion.span
                            variants={{
                                initial: { y: '100%' },
                                hovered: { y: '-100%' },
                            }}
                            key={index}
                            className="inline-block"
                            transition={{
                                ease: 'easeInOut',
                                delay: index * 0.05,
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
            </div>
            <div>
                {typeof children === 'string' &&
                    children.split('').map((letter, index) => (
                        <motion.span
                            variants={{
                                initial: { y: '100%' },
                                hovered: { y: '0' },
                            }}
                            key={index}
                            className="inline-block"
                            transition={{
                                ease: 'easeInOut',
                                delay: index * 0.05,
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
            </div>
        </motion.a>
    );
};
