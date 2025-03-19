"use client";

import { useCreateSurchargeQuery } from "../api/surcharge-query";
import SurchargeForm, { SurchargeSchemaType } from "./surchange-form";

const defaultValues: SurchargeSchemaType = {
    merchantId: 0,
    startRange: 0,
    endRange: 0,
    surchargeAmount: 0,
    flat: false,
};

const CreateSurcharge = () => {

    const { mutate: createSurcharge, isPending } = useCreateSurchargeQuery();

    const onSubmit = (data: SurchargeSchemaType) => {
        createSurcharge(data);
    };

    return (
        <section className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-8">Create Surcharge</h1>
            <SurchargeForm onSubmit={onSubmit} isLoading={isPending} defaultValues={defaultValues} />
        </section>
    );
};

export default CreateSurcharge;