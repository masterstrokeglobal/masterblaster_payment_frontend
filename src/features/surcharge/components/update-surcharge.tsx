"use client";
import { useParams } from "next/navigation";
import { useSurchargeByIdQuery, useUpdateSurchargeQuery } from "../api/surcharge-query";
import SurchargeForm, { SurchargeSchemaType } from "./surchange-form";
import LoadingScreen from "@/components/common/loading-screen";
import { useMemo } from "react";

const UpdateSurcharge = () => {
    const { id } = useParams();

    const { data: surcharge, isLoading } = useSurchargeByIdQuery(Number(id));

    const { mutate: updateSurcharge, isPending } = useUpdateSurchargeQuery();

    const onSubmit = (data: SurchargeSchemaType) => {
        console.log(data);
        updateSurcharge({
            id: Number(id),
            data: data,
        });
    };

    const defaultValues = useMemo(() => {
        if (!surcharge) return null;
        return {
            merchantId: surcharge.merchant.id,
            startRange: surcharge.startRange,
            endRange: surcharge.endRange,
            surchargeAmount: surcharge.surcharge,
            flat: surcharge.flat,
        };
    }, [surcharge]);

    if (isLoading) return <LoadingScreen className="h-screen" />

    return (
        <section className="px-4 py-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Update Surcharge</h1>
            {defaultValues && <SurchargeForm defaultValues={defaultValues} onSubmit={onSubmit} isLoading={isPending} />}
        </section>

    );
};


export default UpdateSurcharge;