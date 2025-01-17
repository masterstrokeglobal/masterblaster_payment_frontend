import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userAPI } from "./user-API";
import { useRouter } from "next/navigation";

export const useGetAllUsers = (filter: any) => {
    return useQuery({
        queryKey: ["users", filter],
        queryFn: () => userAPI.getAllUsers(filter),
    });
};

export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey: ["users", userId],
        queryFn: () => userAPI.getUserById(userId),
    });
};


export const useDeleteUserById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userAPI.deleteUserById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "users";
                },
            });
            toast.success("User deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error deleting user");
        },
    });
};

export const usePasswordChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userAPI.changePassword,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "users";
                },
            });
            toast.success("Password changed successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error changing password");
        },
    });
}


export const useUploadImage = () => {
    return useMutation({
        mutationFn: userAPI.uploadImage,
        onSuccess: () => {
            toast.success("Image uploaded successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error uploading image");
        },
    });
}

export const useLogout = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: userAPI.logout,
        onSuccess: () => {
            toast.success("Logged out successfully");

            router.push("/auth/login");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error logging out");
        },
    });
}