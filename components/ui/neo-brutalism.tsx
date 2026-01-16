import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Neo Brutalism variant generator using CVA
 * Use with cn() to apply neo brutalism styles to any element
 */
const neoBrutalismVariants = cva("border-black transition-all duration-200", {
    variants: {
        border: {
            2: "border-2",
            3: "border-3",
            4: "border-4",
        },
        shadow: {
            none: "",
            xs: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            sm: "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
            md: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            lg: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
            xl: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            "2xl": "shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
            "3xl": "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
            "4xl": "shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]",
        },
        rounded: {
            none: "",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            "3xl": "rounded-3xl",
            full: "rounded-full",
        },
        hover: {
            none: "",
            lift: "hover:-translate-y-1",
            liftSmall: "hover:-translate-y-0.5",
            liftLarge: "hover:-translate-y-2",
            shadowGrow: "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            shadowGrowLg: "hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
        },
        active: {
            none: "",
            push: "active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
            pushLarge:
                "active:translate-x-1 active:translate-y-1 active:shadow-none",
            pushWithShadow:
                "active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        },
    },
    defaultVariants: {
        border: 4,
        shadow: "lg",
        rounded: "none",
        hover: "none",
        active: "none",
    },
});

type NeoBrutalismVariants = VariantProps<typeof neoBrutalismVariants>;


interface NeoBrutalismProps
    extends React.HTMLAttributes<HTMLDivElement>,
    NeoBrutalismVariants {
    children: React.ReactNode;
}

function NeoBrutalism({
    className,
    border,
    shadow,
    rounded,
    hover,
    active,
    children,
    ...props
}: NeoBrutalismProps) {
    return (
        <div
            className={cn(
                neoBrutalismVariants({ border, shadow, rounded, hover, active }),
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}


function nb(variants: NeoBrutalismVariants & { className?: string }) {
    const { className, ...rest } = variants;
    return cn(neoBrutalismVariants(rest), className);
}

export { NeoBrutalism, neoBrutalismVariants, nb };
export type { NeoBrutalismVariants };
