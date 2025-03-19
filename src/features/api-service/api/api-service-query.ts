import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiServiceAPI } from "./api-service-api";
import { toast } from "sonner";

// API Services hooks
export const useGetAllAPIServices = (filter: any) => {
    return useQuery({
        queryKey: ["api-services", filter],
        queryFn: () => apiServiceAPI.getAllAPIServices(filter),
        enabled: !!filter,
    });
}

export const useCreateAPIService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiServiceAPI.createAPIService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-services"] });
            toast.success("API Service created successfully");
        },
        onError: () => {
            toast.error("Failed to create API Service");
        },
    });
}

export const useGetAPIServiceById = (id: number) => {
    return useQuery({
        queryKey: ["api-service", id],
        queryFn: () => apiServiceAPI.getAPIServiceById(id),
    });
}

export const useUpdateAPIService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiServiceAPI.updateAPIService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-services"] });
            toast.success("API Service updated successfully");
        },
        onError: () => {
            toast.error("Failed to update API Service");
        },
    });
}

export const useDeleteAPIService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiServiceAPI.deleteAPIService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-services"] });
            toast.success("API Service deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete API Service");
        },
    });
}

// API Requests hooks
export const useGetAllAPIRequests = (filter: any) => {
    return useQuery({
        queryKey: ["api-requests", filter],
        queryFn: () => apiServiceAPI.getAllAPIRequests(filter),
        enabled: !!filter,
    });
}

export const useCreateAPIServiceRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiServiceAPI.createAPIServiceRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-requests"] });
            toast.success("API Request created successfully");
        },
        onError: () => {
            toast.error("Failed to create API Request");
        },
    });
}

export const useGetAPIServiceRequestById = (id: number) => {
    return useQuery({
        queryKey: ["api-request", id],
        queryFn: () => apiServiceAPI.getAPIServiceRequestById(id),
    });
}

export const useUpdateAPIServiceRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiServiceAPI.updateAPIServiceRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-requests"] });
            toast.success("API Request updated successfully");
        },
        onError: () => {
            toast.error("Failed to update API Request");
        },
    });
}

export const useDeleteAPIServiceRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiServiceAPI.deleteAPIServiceRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-requests"] });
            toast.success("API Request deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete API Request");
        },
    });
}