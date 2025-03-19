import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import FormPassword from "@/components/form/form-password";
import FormProvider from "@/components/form/form-provider";
import FormSwitch from "@/components/form/form-switch";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormTextArea from "@/components/form/form-text-area";
import FormImage from "@/components/ui/form-image";
import { string, z } from "zod";
import FormInput from "@/components/form/form-input";
import FormProvider from "@/components/form/form-provider";
import FormPassword from "@/components/form/form-password";
import FormSwitch from "@/components/form/form-switch";

// Define schema for merchant input
const passwordValidation = z
    .string()
    .refine((val) => val === '' || val === undefined || val.length >= 8, {
        message: "Password must be at least 8 characters long",
    });

export const createMerchantInputSchema = z
    .object({
        id: z.string().optional(),
        name: z.string().max(100),
        email: z.string().email(),
        password: passwordValidation,
        companyName: z.string().max(100),
        companyPanNumber: z.string().optional(),
        companyCINNumber: z.string().optional(),
        isVerified: z.boolean().optional(),
        companyAddress: z.string().max(200),
        companyGSTNumber: z.string().optional(),
        companyPanNumber: z.string().optional(),
        companyCINNumber: z.string().optional(),
        companyGSTImage: z.string().optional(),
        companyPANImage: z.string().optional(),
        companyCINImage: z.string().optional(),
        additionalVerificationInfo: z.string().optional(),
        platformFeePercentage: z.coerce.number().positive(),
        isVerified: z.boolean().optional(),
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

    const handleSubmit = (data: MerchantFormValues) => {

        onSubmit(data);
    };

    return (
        <FormProvider onSubmit={form.handleSubmit(handleSubmit)} methods={form}>
            <div className="space-y-8">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormInput control={form.control} name="name" label="Merchant Name*" />
                        <FormInput control={form.control} name="email" label="Email*" />
                        <FormPassword
                            control={form.control}
                            name="password"
                            type="password"
                            label="Password*"
                        />

                    </CardContent>
                </Card>

                {/* Company Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormInput
                            control={form.control}
                            name="companyName"
                            label="Company Name*"
                        />
                        <FormTextArea
                            control={form.control}
                            name="companyAddress"
                            label="Company Address*"
                        />
                    </CardContent>
                </Card>

                {/* Company Registration */}
                <Card>
                    <CardHeader>
                        <CardTitle>Company Registration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                control={form.control}
                                name="companyGSTNumber"
                                label="GST Number"
                            />
                            <FormImage
                                control={form.control}
                                name="companyGSTImage"
                                label="GST Certificate"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                control={form.control}
                                name="companyPanNumber"
                                label="PAN Number"
                            />
                            <FormImage
                                control={form.control}
                                name="companyPANImage"
                                label="PAN Card"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                control={form.control}
                                name="companyCINNumber"
                                label="CIN Number"
                            />
                            <FormImage
                                control={form.control}
                                name="companyCINImage"
                                label="CIN Certificate"
                            />
                        </div>

                    </CardContent>
                </Card>

                {/* Platform Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormInput
                            control={form.control}
                            name="platformFeePercentage"
                            type="number"
                            label="Platform Fee Percentage*"
                        />
                        <FormSwitch
                            control={form.control}
                            name="isVerified"
                            label="Is Verified"
                            description="If the merchant is verified, it will be shown in the dashboard"
                        />
                    </CardContent>
                </Card>
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