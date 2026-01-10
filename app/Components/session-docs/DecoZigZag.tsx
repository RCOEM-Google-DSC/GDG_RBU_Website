type ClassNameProp = { className?: string };

export const DecoZigZag: React.FC<ClassNameProp> = ({ className }) => (
    <svg
        viewBox="0 0 100 20"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
    >
        <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0 L100 10" />
    </svg>
);
