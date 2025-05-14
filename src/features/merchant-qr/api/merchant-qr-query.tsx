import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { merchantQrAPI } from "./merchant-qr-api";

export const useGetAllMerchantQrs = (filter: any) => {
    return useQuery({
        queryKey: ["merchant-qrs", filter],
        queryFn: () => merchantQrAPI.getAllMerchantQrs(filter),
    });
};

export const useStartAutomation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mobileIp: string) => merchantQrAPI.startAutomation({ mobileIp }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "merchant-qrs",
            });
            toast.success("Automation started successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error starting automation");
        },
    });
};

export const useStopAutomation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mobileIp: string) => merchantQrAPI.stopAutomation({ mobileIp }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "merchant-qrs",
            });
            toast.success("Automation stopped successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error starting automation");
        },
    });
};

export const useCreateMerchantQr = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantQrAPI.createMerchantQr,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-qrs";
                },
            });
            toast.success("QR code created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating QR code");
        },
    });
};

export const useGetMerchantQrById = (qrId: string) => {
    return useQuery({
        queryKey: ["merchant-qrs", qrId],
        queryFn: () => merchantQrAPI.getMerchantQrById(qrId),
    });
};

export const useUpdateMerchantQr = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ qrId, data }: { qrId: string; data: any }) =>
            merchantQrAPI.updateMerchantQr(qrId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-qrs";
                },
            });
            toast.success("QR code updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error updating QR code");
        },
    });
};

export const useDeleteMerchantQr = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: merchantQrAPI.deleteMerchantQr,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-qrs";
                },
            });
            toast.success("QR code deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error deleting QR code");
        },
    });
};

export const useUploadQrImage = () => {
    return useMutation({
        mutationFn: merchantQrAPI.uploadQrImage,
        onSuccess: () => {
            toast.success("QR image uploaded successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error uploading QR image");
        },
    });
};