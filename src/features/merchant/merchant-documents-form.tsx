import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormMultiImageUpload from "@/components/form/form-multiimage";
import FormProvider from "@/components/form/form-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormImage from "@/components/ui/form-image";

// Define schema for merchant document input
export const createMerchantDocumentSchema = z.object({
    moa: z.string().url("Must be a valid URL"),
    aoa: z.string().url("Must be a valid URL"),
    companyPanCard: z.string().url("Must be a valid URL"),
    companyGSTNumber: z.string().url("Must be a valid URL"),
    cio: z.string().url("Must be a valid URL"),
    cancelledCheque: z.string().url("Must be a valid URL"),
    rentAgreement: z.string().url("Must be a valid URL"),
    officeVideo: z.string().url("Must be a valid URL"),
    officePhotos: z.array(z.string().url("Each photo must be a valid URL")),
    directorAadharCardFront: z.string().url("Must be a valid URL"),
    directorAadharCardBack: z.string().url("Must be a valid URL"),
    directorPan: z.string().url("Must be a valid URL"),
});

export type MerchantDocumentFormValues = z.infer<typeof createMerchantDocumentSchema>;

type Props = {
    defaultValues?: MerchantDocumentFormValues;
    onSubmit: (data: MerchantDocumentFormValues) => void;
    isLoading?: boolean;
};

const MerchantDocumentForm = ({ defaultValues, onSubmit, isLoading }: Props) => {
    const form = useForm<MerchantDocumentFormValues>({
        resolver: zodResolver(createMerchantDocumentSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (data: MerchantDocumentFormValues) => {
        onSubmit(data);
    };

    const values = form.watch();
    console.log(values);
    return (
        <FormProvider onSubmit={form.handleSubmit(handleSubmit)} methods={form}>
            <div className="space-y-8">
                {/* MOA and AOA */}
                <Card>
                    <CardHeader>
                        <CardTitle>Incorporation Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormImage
                                control={form.control}
                                name="moa"
                                label="Memorandum of Association (MOA)*"
                            />
                            <FormImage
                                control={form.control}
                                name="aoa"
                                label="Articles of Association (AOA)*"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Company Registration Documents */}
                <Card>
                    <CardHeader>
                        <CardTitle>Company Registration Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormImage
                                inputClassName="bg-background"
                                control={form.control}
                                name="companyPanCard"
                                label="Company PAN Card*"
                            />
                            <FormImage
                                control={form.control}
                                name="companyGSTNumber"
                                label="Company GST Certificate*"
                            />
                            <FormImage
                                control={form.control}
                                name="cio"
                                label="Certificate of Incorporation*"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Financial and Office Documents */}
                <Card>
                    <CardHeader>
                        <CardTitle>Financial and Office Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormImage
                                control={form.control}
                                name="cancelledCheque"
                                label="Cancelled Cheque*"
                            />
                            <FormImage
                                control={form.control}
                                name="rentAgreement"
                                label="Rent Agreement*"
                            />
                            <FormImage
                                control={form.control}
                                name="officeVideo"
                                label="Office Video*"
                            />
                        </div>
                        <FormMultiImageUpload
                            control={form.control}
                            name="officePhotos"
                            label="Office Photos*"
                        />
                    </CardContent>
                </Card>

                {/* Director Documents */}
                <Card>
                    <CardHeader>
                        <CardTitle>Director Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormImage
                                control={form.control}
                                name="directorAadharCardFront"
                                label="Director Aadhar Card (Front)*"
                            />
                            <FormImage
                                control={form.control}
                                name="directorAadharCardBack"
                                label="Director Aadhar Card (Back)*"
                            />
                            <FormImage
                                control={form.control}
                                name="directorPan"
                                label="Director PAN Card*"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <footer className="flex justify-end gap-4 mt-8">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Reset
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Documents"}
                </Button>
            </footer>
        </FormProvider>
    );
};

export default MerchantDocumentForm;