import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import LogoText from "./logo-text";
import { Loader2 } from "lucide-react";

type Props = {
    className?: string;
    logo?: boolean;
    children?: React.ReactNode;
};

const LoadingScreen = ({ className, logo = true }: Props) => {
    return (
        <Skeleton className={cn("flex justify-center items-center ", className)}>
            {logo ?
                <LogoText className="animate-pulse" />
                : <Loader2 className="animate-spin size-6" />
            }
        </Skeleton>
    );
}

export default LoadingScreen;