import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type HoverlinkProps = {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    className?: string;
    isActive: boolean;
};

export const Hoverlink = ({
    children,
    href,
    onClick,
    className,
    isActive,
}: HoverlinkProps) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className={twMerge('group relative font-headers', className)}
        >
            <span
                className={twMerge(
                    'absolute bottom-0 left-0 right-0 z-[-1] h-full origin-bottom bg-backgroundContrast transition-transform duration-300 ease-in-out',
                    isActive ? 'scale-y-[0.2]' : 'scale-y-0',
                    'group-hover:scale-y-100'
                )}
            />
            <motion.span
                className="relative block"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.span>
        </a>
    );
};
