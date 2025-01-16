import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    children: React.ReactNode;
    orentation?: "vertical" | "horizontal";
    className?: string;
    innerClassName?: string;
    hasFooter?: boolean;
    scroll?: boolean;
}

const SectionContent: React.FC<Props> = ({ children, className, innerClassName, orentation = "vertical", hasFooter = false, scroll = true }) => {

    if (!scroll) {
        return (
            <div className={cn("md:w-auto w-screen md:h-[calc(100%-76px)] max-h-full", hasFooter && "md:pb-4 pb-20", className)}>
                {children}
            </div>
        );
    }

    return (
        <ScrollArea
            className={cn("md:w-auto w-screen", hasFooter && "md:pb-4 pb-20", className)}
            type="auto">
            <div className={cn("md:p-5 p-4", innerClassName)}>
                {children}
            </div>

            <ScrollBar orientation={orentation} />

        </ScrollArea>
    );
};

export default SectionContent;