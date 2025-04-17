import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  PaymentStatus,
  UserWithdrawal,
  WithdrawalStatus,
} from "@/models/user-withdrawl";
import FormProvider from "@/components/form/form-provider";
import FormGroupSelect from "@/components/form/form-select";
import { useUpdateUserWithdrawalStatus } from "@/features/user-withdrawl/api/user-withdrawl-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

const userWithdrawalColumns: ColumnDef<UserWithdrawal>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
  },
  {
    header: "TYPE",
    accessorKey: "type",
    cell: ({ row }) => <div className="font-medium">{row.original.type}</div>,
  },
  {
    header: "Name",
    accessorKey: "username",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.userName}</div>
    ),
  },
  {
    header: "AMOUNT",
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className="font-medium">Rs.{row.original.amount.toFixed(2)}</div>
    ),
  },
  {
    header: "STATUS",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant = "";

      switch (status) {
        case WithdrawalStatus.COMPLETED:
          variant = "success";
          break;
        case WithdrawalStatus.PENDING:
          variant = "warning";
          break;
        case WithdrawalStatus.FAILED:
          variant = "destructive";
          break;
      }

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    header: "PAYMENT STATUS",
    accessorKey: "paymentStatus",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      let variant = "";

      switch (status) {
        case PaymentStatus.COMPLETED:
          variant = "success";
          break;
        case PaymentStatus.PENDING:
          variant = "warning";
          break;
        case PaymentStatus.FAILED:
          variant = "destructive";
          break;
        case PaymentStatus.NOT_INITIATED:
          variant = "outline";
          break;
      }

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    header: "Update Status",
    accessorKey: "dropDown",
    cell: ({ row }) => <ActionDropDown withdrawal={row.original} />,
  },
  {
    header: "CREATED AT",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        {new Date(new Date(row.original.createdAt).getTime()).toLocaleString(
          "en-IN",
          {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium",
          }
        )}
      </div>
    ),
  },
  {
    header: "UPDATED AT",
    accessorKey: "updatedAt",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        {new Date(new Date(row.original.updatedAt).getTime()).toLocaleString(
          "en-IN",
          {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium",
          }
        )}
      </div>
    ),
  },
  {
    header: "UTR",
    accessorKey: "utr",
    cell: ({ row }) => <div className="font-medium">{row.original.utr}</div>,
  },
  {
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => <ActionColumn withdrawal={row.original} />,
  },
];

export default userWithdrawalColumns;

const ActionColumn = ({ withdrawal }: { withdrawal: UserWithdrawal }) => {
  return (
    <div className="flex justify-end">
      <Link href={`/dashboard/user-payouts/${withdrawal.id}`}>
        <Button size="icon" variant="ghost" aria-label="View Withdrawal">
          <Eye className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};

const withdrawalSchema = z.object({
    status: z.enum([WithdrawalStatus.PENDING, WithdrawalStatus.COMPLETED, WithdrawalStatus.FAILED]),
});

const ActionDropDown = ({ withdrawal }: { withdrawal: UserWithdrawal }) => {
  const id = String(withdrawal.id);
  const updateWithdrawalStatus = useUpdateUserWithdrawalStatus();

  type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: { status: WithdrawalStatus.PENDING },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: WithdrawalFormValues) => {
    updateWithdrawalStatus.mutate(
      { withdrawalId: id as string, data },
      {
        onSuccess: () =>
          toast.success("Withdrawal status updated successfully"),
        onError: (error) =>
          toast.error(error.response?.data?.message || "Error updating status"),
      }
    );
  };
  return (
    <>
      {withdrawal?.status === WithdrawalStatus.PENDING && (
        <div className="mt-6">
          <FormProvider methods={form} onSubmit={handleSubmit(onSubmit)}>
            <FormGroupSelect
              name="status"
              label=""
              control={control}
              options={Object.values(WithdrawalStatus).map((status) => ({
                label: status,
                value: status,
              }))}
            />
            <Button
              type="submit"
              disabled={updateWithdrawalStatus.isPending}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
            >
              {updateWithdrawalStatus.isPending
                ? "Updating..."
                : "Update Status"}
            </Button>
          </FormProvider>
        </div>
      )}
    </>
  );
};
