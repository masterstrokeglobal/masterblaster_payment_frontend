import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
    (props, ref) => {
        return (
            <div className={cn("relative w-full", props.className)}>
                <Input
                    ref={ref}
                    {...props}
                    className={cn("pl-10")}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
        );
    }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
