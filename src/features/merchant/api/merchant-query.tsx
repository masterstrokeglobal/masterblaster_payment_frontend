

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { merchantAPI } from "./merchant-api";

export const useGetAllMerchants = (filter: any) => {
    return useQuery({
        queryKey: ["merchants", filter],
        queryFn: () => merchantAPI.getAllMerchants(filter),
    });
};

export const useCreateMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantAPI.createMerchant,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Merchant created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating merchant");
        },
    });
}

export const useGetMerchantById = (merchantId: string) => {
    return useQuery({
        queryKey: ["merchants", merchantId],
        queryFn: () => merchantAPI.getMerchantById(merchantId),
    });
};

export const useDeleteMerchantById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantAPI.deleteMerchantById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Merchant deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error deleting merchant");
        },
    });
};

export const usePasswordChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantAPI.changePassword,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchants";
                },
            });
            toast.success("Password changed successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error changing password");
        },
    });
};

export const useUploadImage = () => {
    return useMutation({
        mutationFn: merchantAPI.uploadImage,
        onSuccess: () => {
            toast.success("Image uploaded successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error uploading image");
        },
    });
};

export const useGetMerchantDashboardData = (filter: any) => {
    return useQuery({
        queryKey: ["dashboard", "merchant", filter],
        queryFn: () => merchantAPI.getDashboardData(filter),
    });
};

export const useGetBarChartData = (filter: any) => {
    return useQuery({
        queryKey: ["dashboard", "bar-chart", filter],
        queryFn: () => merchantAPI.getBarChartData(filter),
    });
};