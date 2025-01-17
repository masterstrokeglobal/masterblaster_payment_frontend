import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/form/form-input";
import FormProvider from "@/components/form/form-provider";
import FormPassword from "@/components/form/form-password";

// Define schema for merchant input
const passwordValidation = z
    .string()
    .min(8)
    .max(100)
export const createMerchantInputSchema = z
    .object({
        id: z.string().optional(),
        name: z.string().max(100),
        email: z.string().email(),
        password: passwordValidation,
        companyName: z.string().max(100),
        companyAddress: z.string().max(200),
        companyGSTNumber: z.string().optional(),
        platformFeePercentage: z.coerce.number().positive(),
    });

export type MerchantFormValues = z.infer<typeof createMerchantInputSchema>;

type Props = {
    defaultValues?: MerchantFormValues;
    onSubmit: (data: MerchantFormValues) => void;
    isLoading?: boolean;
};

const MerchantForm = ({ defaultValues, onSubmit, isLoading }: Props) => {
    const form = useForm<MerchantFormValues>({
        resolver: zodResolver(createMerchantInputSchema),
        defaultValues,
    });
    console.log(form.formState.errors);

    const handleSubmit = (data: MerchantFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider onSubmit={form.handleSubmit(handleSubmit)} methods={form}>
            <div className="space-y-4">
                <FormInput control={form.control} name="name" label="Merchant Name" />
                <FormInput control={form.control} name="email" label="Email*" />
                <FormPassword
                    control={form.control}
                    name="password"
                    type="password"
                    label="Password*"
                />
                <FormInput
                    control={form.control}
                    name="companyName"
                    label="Company Name"
                />
                <FormInput
                    control={form.control}
                    name="companyAddress"
                    label="Company Address"
                />
                <FormInput
                    control={form.control}
                    name="companyGSTNumber"
                    label="Company GST Number (Optional)"
                />
                <FormInput
                    control={form.control}
                    name="platformFeePercentage"
                    type="number"
                    label="Platform Fee"
                />
            </div>

            <footer className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Reset
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Merchant"}
                </Button>
            </footer>
        </FormProvider>
    );
};

export default MerchantForm;
