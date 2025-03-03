import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({ className }: PropsWithClassName) => {
    return (
        <Image width={120} height={120} src="/images/text-logo.svg" className={cn(" w-full", className)} alt="logo" />
    );
}

export default Logo;