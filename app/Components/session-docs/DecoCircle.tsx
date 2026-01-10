type ClassNameProp = { className?: string };

export const DecoCircle: React.FC<ClassNameProp> = ({ className }) => (
    <div
        className={`${className ?? ""} rounded-full border-4 border-black bg-transparent`}
    />
);
