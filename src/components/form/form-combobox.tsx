"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Combobox from "@/components/ui/combobox";

function FormComboboxSelect<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    control,
    name,
    label,
    options,
}: {
    label?: string;
    control: Control<TFieldValues>;
    options: { value: string; label: string }[];
    className?: string;
    onSearchInputChange?: (value: string) => void;
    name: TName;
    description?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <br />
                    <Combobox
                        className="w-full"
                        placeholder="Select an option"
                        options={options}
                        onChange={field.onChange}
                        value={field.value}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default FormComboboxSelect;
