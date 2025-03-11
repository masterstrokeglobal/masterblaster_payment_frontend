import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { merchantApiKeyAPI } from "./merchant-key-api";

export const useGetAllMerchantApiKeys = (filters: any) => {
    return useQuery({
        queryKey: ["merchant-api-keys", filters],
        queryFn: () => merchantApiKeyAPI.getAllApiKeys(filters),
    });
};

export const useCreateMerchantApiKey = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: merchantApiKeyAPI.createApiKey,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-api-keys";
                },
            });
            toast.success("API key created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating API key");
        },
    });
};

export const useGetMerchantApiKeyById = (apiKeyId: string) => {
    return useQuery({
        queryKey: ["merchant-api-keys", apiKeyId],
        queryFn: () => merchantApiKeyAPI.getApiKeyById(apiKeyId),
    });
};

export const useUpdateMerchantApiKeyIp = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ apiKeyId, data }: { apiKeyId: string; data: any }) =>
            merchantApiKeyAPI.updateIpAddress(apiKeyId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-api-keys";
                },
            });
            toast.success("API key IP address updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error updating API key IP address");
        },
    });
};

export const useRegenerateMerchantApiKey = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (apiKeyId: string) => merchantApiKeyAPI.regenerateApiKey(apiKeyId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-api-keys";
                },
            });
            toast.success("API key regenerated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error regenerating API key");
        },
    });
};

export const useDeactivateMerchantApiKey = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (apiKeyId: string) => merchantApiKeyAPI.deactivateApiKey(apiKeyId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-api-keys";
                },
            });
            toast.success("API key deactivated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error deactivating API key");
        },
    });
};

export const useActivateMerchantApiKey = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (apiKeyId: string) => merchantApiKeyAPI.activateApiKey(apiKeyId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "merchant-api-keys";
                },
            });
            toast.success("API key activated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error activating API key");
        },
    });
};