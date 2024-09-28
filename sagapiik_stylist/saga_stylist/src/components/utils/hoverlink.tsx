import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type HoverlinkProps = {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    className?: string;
};

export const Hoverlink = ({
    children,
    href,
    onClick,
    className,
}: HoverlinkProps) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className={twMerge(
                'group relative inline-block font-headers', // Use `inline-block` to help with proper alignment
                className
            )}
        >
            {/* Background bar behind the text, initially 20% visible */}
            <span className="absolute bottom-0 left-0 right-0 z-[-1] h-full origin-bottom scale-y-[0.2] bg-[#19A7CE] transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

            {/* Text itself */}
            <motion.span className="relative block">{children}</motion.span>
        </a>
    );
};
