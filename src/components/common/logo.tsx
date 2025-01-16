import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({ className }: PropsWithClassName) => {
    return (
        <Image width={120} height={120} src="/images/logo.svg" className={cn("h-24 w-auto", className)} alt="logo" />
    );
}

export default Logo;