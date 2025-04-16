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
    header: "UTR",
    accessorKey: "utr",
    cell: ({ row }) => <div className="font-medium">{row.original.utr}</div>,
  },
  {
    header: "CREATED AT",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        {new Date(row.original.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium", 
          timeStyle: "medium",
        })}
      </div>
    ),
  },
  {
    header: "UPDATED AT",
    accessorKey: "updatedAt",
    cell: ({ row }) => (
      <div className="text-[#6B7280]">
        {new Date(row.original.updatedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium", 
          timeStyle: "medium",
        })}
      </div>
    ),
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
