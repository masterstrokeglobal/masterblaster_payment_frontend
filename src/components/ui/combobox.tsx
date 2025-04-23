'use client';
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComboboxProps {
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

function Combobox({
    options,
    value,
    onChange,
    label,
    placeholder = 'Select an option',
    disabled = false,
    className,
}: ComboboxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options.filter((option) => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (selectedValue: string) => {
        if (onChange) {
            onChange(selectedValue);
        }
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className={cn('w-full', className)}>
            {label && <div className="bg-background mb-2 text-sm font-medium">{label}</div>}
            <Popover open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) setSearchTerm('');
            }}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOpen}
                        disabled={disabled}
                        className="w-full justify-between bg-background text-primary hover:bg-background"
                    >
                        {value
                            ? options.find((option) => option.value === value)?.label
                            : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            value={searchTerm}
                            onValueChange={setSearchTerm}
                            placeholder={`Search ${label ? label.toLowerCase() : "options"}`}
                            className="w-full"
                        />
                        <CommandList>
                            <ScrollArea className="h-60">
                                <CommandEmpty>
                                    No {label?.toLowerCase() || "options"} found.
                                </CommandEmpty>
                                <CommandGroup>
                                    {filteredOptions.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={() => handleSelect(option.value)}
                                        >
                                            {option.label}
                                            <Check
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    option.value === value ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default Combobox;