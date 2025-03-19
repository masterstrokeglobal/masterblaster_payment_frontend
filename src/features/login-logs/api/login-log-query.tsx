import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginLogAPI } from "./login-log-api";

export const useGetAllLoginLogs = (filter: any) => {
    return useQuery({
        queryKey: ["loginLogs", filter],
        queryFn: () => loginLogAPI.getAllLoginLogs(filter),
    });
};

export const useCreateLoginLog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginLogAPI.createLoginLog,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === "loginLogs";
                },
            });
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message ?? "Error creating login log");
        },
    });
};

export const useGetLoginLogById = (loginLogId: string) => {
    return useQuery({
        queryKey: ["loginLogs", loginLogId],
        queryFn: () => loginLogAPI.getLoginLogById(loginLogId),
    });
};