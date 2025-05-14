import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/models/transaction";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuthStore } from "@/context/auth-context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useApproveTransaction,
  useRejectTransaction,
} from "@/features/transaction/query/transactions-queries";
import FormProvider from "@/components/form/form-provider";
import FormGroupSelect from "@/components/form/form-select";

const transactionColumns: ColumnDef<Transaction>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
  },
  {
    header: "TYPE",
    accessorKey: "type",
    cell: ({ row }) => {
      const type = row.original.type;
      const colorClass =
        type === TransactionType.DEPOSIT ? "text-green-600" : "text-red-600";
      return (
        <Badge
          variant={type === TransactionType.DEPOSIT ? "success" : "destructive"}
        >
          {type}
        </Badge>
      );
    },
  },
  {
    header: "UTR",
    accessorKey: "pgId",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">{row.original.pgId}</div>
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">{row.original.payerName}</div>
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
        case TransactionStatus.COMPLETED:
          variant = "success";
          break;
        case TransactionStatus.PENDING:
          variant = "warning";
          break;
        case TransactionStatus.FAILED:
          variant = "destructive";
          break;
      }

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    header: "Update Status",
    accessorKey: "dropDown",
    cell: ({ row }) => <ActionDropDown transaction={row.original} />,
  },
  // {
  //   header: "Platform Fee %",
  //   accessorKey: "bonusPercentage",
  //   cell: ({ row }) => (
  //     <div className="text-[#6B7280]">
  //       {row.original.platformFeePercentage}%
  //     </div>
  //   ),
  // },
  {
    header: "Platform Fee",
    accessorKey: "bonusAmount",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        Rs.{row.original.platformFeeAmount.toFixed(2)}
      </div>
    ),
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
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => <ActionColumn transaction={row.original} />,
  },
];

export default transactionColumns;

const ActionColumn = ({ transaction }: { transaction: Transaction }) => {
  const { userDetails } = useAuthStore();

  return (
    <div className="flex justify-end">
      <Link href={`/dashboard/transactions/${transaction.id}`}>
        <Button size="icon" variant="ghost" aria-label="Edit Transaction">
          <Eye className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};
export const transactionEditSchema = z.object({
  status: z.enum([
    TransactionStatus.PENDING,
    TransactionStatus.COMPLETED,
    TransactionStatus.FAILED,
  ]),
});

const ActionDropDown = ({ transaction }: { transaction: Transaction }) => {
  const id = String(transaction.id);

  type TransactionFormValues = z.infer<typeof transactionEditSchema>;

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionEditSchema),
    defaultValues: { status: TransactionStatus.PENDING },
  });

  const { handleSubmit, control } = form;

  const { mutate: approve, isPending: isPending } = useApproveTransaction();
  const { mutate: reject, isPending: confirmPending } = useRejectTransaction();

  const onSubmit = (updatedData: TransactionFormValues) => {
    if (updatedData.status == TransactionStatus.COMPLETED) {
      approve(id!.toString());
    }
    if (updatedData.status == TransactionStatus.FAILED) {
      reject(id!.toString());
    }
  };
  return (
    <>
      {transaction?.status === TransactionStatus.PENDING && (
        <div className="">
          <FormProvider className="flex" methods={form} onSubmit={handleSubmit(onSubmit)}>
            <FormGroupSelect
              name="status"
              label=""
              control={control}
              options={Object.values(TransactionStatus).map((status) => ({
                label: status,
                value: status,
              }))}
              // options={[
              //   {
              //     label: "Completed",
              //     value: TransactionStatus.COMPLETED.toString(),
              //   },
              //   {
              //     label: "Cancelled",
              //     value: TransactionStatus.FAILED.toString(),
              //   },
              // ]}
            />
            <Button
              variant="outline"
              className="text-primary mx-4 mt-2"
              type="submit"
              disabled={isPending || confirmPending}
            >
              {isPending || confirmPending ? "Updating..." : "Update Status"}
            </Button>
          </FormProvider>
        </div>
      )}
    </>
  );
};
