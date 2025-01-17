import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import { Trash2, Loader2, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { useAuthStore } from "@/context/auth-context";
import Admin, { AdminRole } from "@/models/admin";
import Merchant from "@/models/merchant";

const merchantColumns: ColumnDef<Merchant>[] = [
    {
        header: "NAME",
        accessorKey: "name",
        cell: ({ row }) => <div className="w-48 truncate">{row.original.name}</div>,
    },
    {
        header: "EMAIL",
        accessorKey: "email",
        cell: ({ row }) => <div className="text-[#6B7280] w-48 truncate">{row.original.email}</div>,
    },
    {
        header: "PHONE",
        accessorKey: "phone",
        cell: ({ row }) => <div className="text-[#6B7280]">{row.original.phone || 'N/A'}</div>,
    },
    {
        header: "COMPANY NAME",
        accessorKey: "companyName",
        cell: ({ row }) => <div className="w-48 truncate">{row.original.companyName}</div>,
    },
    {
        header: "CREATED ON",
        accessorKey: "createdAt",
        cell: ({ row }) => (
            <span className="text-[#6B7280]">
                {dayjs(row.original.createdAt).format("DD-MM-YYYY")}
            </span>
        ),
    },
    {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => <ActionColumn merchant={row.original} />,
    },
];

const ActionColumn = ({ merchant }: { merchant: Merchant }) => {
    const { userDetails } = useAuthStore();
    const currentUser = userDetails as Admin;

    const handleDeleting = () => {
        if (merchant.id) {
            // Add delete logic here
        }
    };

    let showDelete = true;

    if (currentUser.role == AdminRole.AGENT) {
        showDelete = false;
    }

    return (
        <AlertDialog>
            <div className="flex space-x-4 w-36 justify-end">
                <Link href={`/dashboard/merchants/${merchant.id}`}>
                    <Button size="icon" variant="ghost" aria-label="View Merchant">
                        <Eye className="w-5 h-5" />
                    </Button>
                </Link>

            </div>

            <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-gray-600">
                        This action cannot be undone. This will permanently delete the merchant account and remove their data
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4 flex justify-end space-x-3">
                    <AlertDialogCancel className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={handleDeleting}
                        >
                            Delete Merchant
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default merchantColumns;
