import { cn } from "@/lib/utils";

const LogoText = ({ className }: PropsWithClassName) => {
    return (
        <div className={cn("text-2xl font-giest font-bold", className)}>
            Soft-Payments
        </div>
    );
}

export default LogoText;