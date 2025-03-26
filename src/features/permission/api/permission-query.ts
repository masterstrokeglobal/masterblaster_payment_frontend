
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { permissionAPI } from "./permission-api";

export const useGetAllPermissions = (filter: any) => {
    return useQuery({
        queryKey: ["permissions", filter],
        queryFn: () => permissionAPI.getAllPermissions(filter),
    });
};

export const useCreatePermission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: permissionAPI.createPermission,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "permissions";
                },
            });
            toast.success("Permission created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating permission");
        },
    });
}

export const useGetPermissionById = (permissionId: string) => {
    return useQuery({
        queryKey: ["permissions", permissionId],
        queryFn: () => permissionAPI.getPermissionById(permissionId),
    });
};

export const useDeletePermissionById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: permissionAPI.deletePermissionById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "permissions";
                },
            });
            toast.success("Permission deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error deleting permission");
        },
    });
};

export const useUpdatePermission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: permissionAPI.updatePermission,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "permissions";
                },
            });
            toast.success("Permission updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error updating permission");
        },
    });
}
