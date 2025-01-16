import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction, TransactionStatus, TransactionType } from "@/models/transaction";

const transactionColumns: ColumnDef<Transaction>[] = [
    {
        header: "ID",
        accessorKey: "id",
        cell: ({ row }) => (
            <div className="font-medium">{row.original.id}</div>
        ),
    },
    {
        header: "TYPE",
        accessorKey: "type",
        cell: ({ row }) => {
            const type = row.original.type;
            const colorClass = type === TransactionType.DEPOSIT 
                ? "text-green-600" 
                : "text-red-600";
            return (
                <div className={`font-medium capitalize ${colorClass}`}>
                    {type}
                </div>
            );
        },
    },
    {
        header: "AMOUNT",
        accessorKey: "amount",
        cell: ({ row }) => (
            <div className="font-medium">
                ${row.original.amount.toFixed(2)}
            </div>
        ),
    },
    {
        header: "STATUS",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.original.status;
            let statusClass = "";
            
            switch (status) {
                case TransactionStatus.COMPLETED:
                    statusClass = "bg-green-100 text-green-700";
                    break;
                case TransactionStatus.PENDING:
                    statusClass = "bg-yellow-100 text-yellow-700";
                    break;
                case TransactionStatus.FAILED:
                    statusClass = "bg-red-100 text-red-700";
                    break;
            }
            
            return (
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${statusClass}`}>
                    {status}
                </div>
            );
        },
    },
    {
        header: "BONUS %",
        accessorKey: "bonusPercentage",
        cell: ({ row }) => (
            <div className="text-[#6B7280]">
                {row.original.bonusPercentage}%
            </div>
        ),
    },
    {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Button 
                    size="icon" 
                    variant="ghost" 
                    aria-label="View Transaction Details"
                >
                    <Eye className="w-5 h-5" />
                </Button>
            </div>
        ),
    },
];

export default transactionColumns;