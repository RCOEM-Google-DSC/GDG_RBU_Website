type ClassNameProp = { className?: string };

export const DecoCross: React.FC<ClassNameProp> = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
    >
        <path d="M6 6L18 18M6 18L18 6" />
    </svg>
);
