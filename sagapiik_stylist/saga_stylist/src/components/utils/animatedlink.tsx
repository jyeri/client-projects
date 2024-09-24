import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type linkProps = {
    children: React.ReactNode;
    href: string;
    className?: string;
};

export const Animatedlink = ({ children, href, className }: linkProps) => {
    return (
        <motion.a
            href={href}
            className={twMerge(
                'relative block overflow-hidden whitespace-nowrap font-headers',
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
                                initial: {
                                    y: '50%',
                                },
                                hovered: {
                                    y: '-100%',
                                },
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
                                initial: {
                                    y: '100%',
                                },
                                hovered: {
                                    y: '-50%',
                                },
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
