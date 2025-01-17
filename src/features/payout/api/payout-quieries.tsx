
// Payout Queries
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { payoutAPI } from "./payout-API";
import WithdrawDetailsRecord from "@/models/withdrawl-details";

export const useGetAllPayouts = (filter: any) => {
    return useQuery({
        queryKey: ["payouts", filter],
        queryFn: () => payoutAPI.getAllPayouts(filter),
    });
};

export const useGetPayoutById = (payoutId: string) => {
    return useQuery({
        queryKey: ["payouts", payoutId],
        queryFn: () => payoutAPI.getPayoutById(payoutId),
    });
};

export const useCreatePayout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: payoutAPI.createPayout,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "payouts",
            });
            toast.success("Payout created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error creating payout");
        },
    });
};

export const useUpdatePayout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ payoutId, data }: { payoutId: string; data: any }) =>
            payoutAPI.updatePayout(payoutId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "payouts",
            });
            toast.success("Payout updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error updating payout");
        },
    });
};

export const useDeletePayout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: payoutAPI.deletePayout,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "payouts",
            });
            toast.success("Payout deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error deleting payout");
        },
    });
};

export const useGetAllPayoutOptions = () => {
    return useQuery<WithdrawDetailsRecord[]>({
        queryKey: ["payout-options"],
        queryFn: async () =>{
            const data = (await payoutAPI.getAllPayoutOptions()).data;
            return data.map((record: any) => new WithdrawDetailsRecord(record));
        }
    });
};

export const useCreatePayoutOption = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: payoutAPI.createPayoutOption,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "payout-options",
            });
            toast.success("Payout option created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error creating payout option");
        },
    });
};

export const useUpdatePayoutOption = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ optionId, data }: { optionId: string; data: any }) =>
            payoutAPI.updatePayoutOption(optionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "payout-options",
            });
            toast.success("Payout option updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error updating payout option");
        },
    });
};

export const useDeletePayoutOption = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: payoutAPI.deletePayoutOption,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "payout-options",
            });
            toast.success("Payout option deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message ?? "Error deleting payout option");
        },
    });
};