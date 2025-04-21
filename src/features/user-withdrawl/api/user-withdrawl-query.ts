import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import userWithdrawalAPI from "./user-withdrawl-api";

export const useGetAllUserWithdrawals = (
  filter: any,
  options?: {
    refetchInterval?: number | false;
    [key: string]: any; // Allow other React Query options
  }
) => {
  return useQuery({
    queryKey: ["user-withdrawals", filter],
    queryFn: () => userWithdrawalAPI.getAllUserWithdrawals(filter),
    ...options,
  });
};

export const useCreateUserWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userWithdrawalAPI.createUserWithdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "user-withdrawals",
      });
      toast.success("User withdrawal request created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ??
          "Error creating user withdrawal request"
      );
    },
  });
};

export const useCreateBulkPayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userWithdrawalAPI.createBulkPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "user-withdrawals",
      });
      toast.success("Bulk payout created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Error creating bulk payout"
      );
    },
  });
};

export const useGetUserWithdrawalById = (withdrawalId?: string) => {
  return useQuery({
    queryKey: ["user-withdrawals", withdrawalId],
    queryFn: () => userWithdrawalAPI.getUserWithdrawalById(withdrawalId!),
    enabled: !!withdrawalId,
  });
};

export const useUpdateUserWithdrawalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ withdrawalId, data }: { withdrawalId: string; data: any }) =>
      userWithdrawalAPI.updateUserWithdrawalStatus(withdrawalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "user-withdrawals",
      });
      toast.success("User withdrawal status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ?? "Error updating user withdrawal status"
      );
    },
  });
};
