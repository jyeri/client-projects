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
                    'absolute bottom-0 left-0 right-0 z-[-1] h-full origin-bottom bg-backgroundContrast transition-transform duration-300 ease-in-out group-hover:scale-y-100',
                    isActive ? 'scale-y-[0.2]' : 'scale-y-0'
                )}
            />
            <motion.span className="relative block">{children}</motion.span>
        </a>
    );
};
