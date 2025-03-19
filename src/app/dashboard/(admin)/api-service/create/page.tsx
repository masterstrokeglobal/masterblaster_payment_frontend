"use client";

import ApiServiceForm from "@/features/api-service/components/api-service-form";

import { ApiServiceSchemaType } from "@/features/api-service/components/api-service-form";
import { useCreateAPIService } from "@/features/api-service/api/api-service-query";
import { useRouter } from "next/navigation";
        
const defaultValues: ApiServiceSchemaType = {
    name: "",
    description: "",
    price: 0,
    active: true,
    imageUrl: "",
};

const CreateApiService = () => {
    const { mutate: createApiService, isPending } = useCreateAPIService();
    const router = useRouter();

    const onSubmit = (data: ApiServiceSchemaType) => {
        createApiService(data, {
            onSuccess: () => {
                router.push("/dashboard/api-service");
            }
        });
    };

    return (
        <section className="w-full max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Create API Service</h1>
            <ApiServiceForm onSubmit={onSubmit} isLoading={isPending} defaultValues={defaultValues} />
        </section>
    );
};

export default CreateApiService;