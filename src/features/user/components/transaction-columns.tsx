import { ColumnDef } from "@tanstack/react-table";
import { Eye, PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/models/transaction";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuthStore } from "@/context/auth-context";

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
    header: "Platform Fee %",
    accessorKey: "bonusPercentage",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        {row.original.platformFeePercentage}%
      </div>
    ),
  },
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
