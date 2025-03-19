"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { useGetAPIServiceById, useUpdateAPIService } from "@/features/api-service/api/api-service-query";
import ApiServiceForm, { ApiServiceSchemaType } from "@/features/api-service/components/api-service-form";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateApiService = () => {
    const { id } = useParams();


    const { data: apiService, isLoading } = useGetAPIServiceById(Number(id));

    const { mutate: updateApiService, isPending } = useUpdateAPIService();

    const onSubmit = (data: ApiServiceSchemaType) => {
        updateApiService({ ...data, id: Number(id) });
    };

    const defaultValues = useMemo(() => {
        if (!apiService) return null;
        const apiServiceData = apiService.data;
        return {
            name: apiServiceData.name || "",
            description: apiServiceData.description || "",
            price: apiServiceData.price || 0,
            active: apiServiceData.active || false,
            imageUrl: apiServiceData.imageUrl || "",
        };
    }, [apiService]);

    if (isLoading) return <LoadingScreen className="h-screen" />

    return (
        <section className="px-4 py-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Update API Service</h1>
            {defaultValues && <ApiServiceForm defaultValues={defaultValues} onSubmit={onSubmit} isLoading={isPending} />}
        </section>
    );
};

export default UpdateApiService;