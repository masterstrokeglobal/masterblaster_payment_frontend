import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SurchargeSchemaType } from "../components/surchange-form";
import surchargeAPI from "./surchange-api";
import { toast } from "sonner";
import { AxiosError } from "axios";
export const useSurchargeQuery = (filter?: any) => {
    return useQuery({
        queryKey: ["surcharge", filter],
        queryFn: () => surchargeAPI.getSurcharge(filter),
    });
};

export const useSurchargeByIdQuery = (id: number) => {
    return useQuery({
        queryKey: ["surcharge", id],
        queryFn: () => surchargeAPI.getSurchargeById(id),
    });
};

export const useCreateSurchargeQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SurchargeSchemaType) => surchargeAPI.createSurcharge(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["surcharge"] });
            toast.success("Surcharge created successfully");
        },
        onError: (error) => {
            toast.error("Failed to create surcharge");
            console.error(error);
        },
    });
};

export const useUpdateSurchargeQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: surchargeAPI.updateSurcharge,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["surcharge"] });
            toast.success("Surcharge updated successfully");
        },
        onError: (error: AxiosError<any>) => {
            toast.error(error.response?.data?.message || "Failed to update surcharge");
            console.error(error);
        },
    });
};

export const useDeleteSurchargeQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => surchargeAPI.deleteSurcharge(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["surcharge"] });
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
