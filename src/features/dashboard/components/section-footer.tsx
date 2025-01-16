import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<PropsWithClassName>;

const SectionFooter = ({ className, children }: Props) => {
    return (
        <footer className={cn("md:hidden min-h-20 bg-white fixed  border-t border-[#E7E9EC] flex bottom-0 left-0 w-full  border-b shrink-0 items-center justify-between gap-2 px-5", className)}>
            {children}
        </footer>
    );
};

export default SectionFooter;
