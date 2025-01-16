import { cn } from "@/lib/utils";
import Image from "next/image";

const LogoText = ({ className }: PropsWithClassName) => {
    return (
        <div className={cn("text-2xl font-giest font-bold", className)}>
            Bolt-Payments
        </div>
    );
}

export default LogoText;