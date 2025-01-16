import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { FC } from "react";

type Props = {
    title: string;
    children: React.ReactNode;
    className?: string;
};

const SecondaryDashboardHeader: FC<Props> = ({ children, title, className }) => {
    return (
        <header className={cn("flex md:h-20 h-16 md:bg-background bg-white shrink-0 items-center justify-between gap-2 px-4", className)}>
            <SidebarTrigger />
            <h2 className="text-xl font-bold">{title}</h2>
            {children}
        </header>
    );
};


export default SecondaryDashboardHeader;