import FormCombobox from "@/components/form/form-combobox";
import FormInput from "@/components/form/form-input";
import FormProvider from "@/components/form/form-provider";
import FormSwitch from "@/components/form/form-switch";
import { Button } from "@/components/ui/button";
import { useGetAllMerchants } from "@/features/merchant/api/merchant-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const surchargeSchema = z.object({
    merchantId: z.coerce.number(),
    startRange: z.coerce.number(),
    endRange: z.coerce.number(),
    surchargeAmount: z.coerce.number(),
    flat: z.boolean().default(false),
}).refine(data => {
    if (data.startRange >= data.endRange) {
        return false;
    }
    return true;
}, {
    message: "Start range must be less than end range", path: ["startRange"]
});

export type SurchargeSchemaType = z.infer<typeof surchargeSchema>;


type Props = {
    onSubmit: (data: SurchargeSchemaType) => void;
    defaultValues?: SurchargeSchemaType;
    isLoading?: boolean;
};



const SurchargeForm = ({ onSubmit, defaultValues, isLoading }: Props) => {
    const [search, setSearch] = useState("");

    const { data: merchants } = useGetAllMerchants({ search });

    const merchantOptions = useMemo(() => {
        return merchants?.data.merchants?.map((merchant: { id: any; name: any; }) => ({
            value: merchant.id,
            label: merchant.name,
        })) ?? [];
    }, [merchants]);

    const form = useForm<SurchargeSchemaType>({
        resolver: zodResolver(surchargeSchema),
        defaultValues,
    });


    const flat = form.watch("flat");
    return <section className="w-full">
        <FormProvider methods={form} className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormCombobox
                control={form.control}
                name="merchantId"
                onSearchInputChange={(value) => setSearch(value)}
                label="Merchant"
                defaultValue={defaultValues?.merchantId}
                options={merchantOptions}
            />

            <FormInput
                control={form.control}
                name="startRange"
                label="Start Range"
            />

            <FormInput
                control={form.control}
                name="endRange"
                label="End Range"
            />

            <FormInput
                control={form.control}
                name="surchargeAmount"
                label="surcharge Amount"
                description={`${flat ? "Flat" : "Percentage"}`}
            />

            <FormSwitch
                control={form.control}
                name="flat"
                label="Flat"
                description="If true, the surcharge Amount will be a flat amount"
            />

            <Button type="submit" disabled={isLoading} className="mt-4 w-full">
                {isLoading ? "Loading..." : "Submit"}
            </Button>

        </FormProvider>
    </section>
};

export default SurchargeForm;


