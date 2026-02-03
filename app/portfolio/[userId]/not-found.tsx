import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PortfolioNotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
                This portfolio either doesn&apos;t exist or hasn&apos;t been published
                yet.
            </p>
            <Link href="/">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
}
