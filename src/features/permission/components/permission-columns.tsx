import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/context/auth-context";
import Admin, { AdminRole } from "@/models/admin";
import Permission from "@/models/permission";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Loader2, Pencil, Trash } from 'lucide-react';
import Link from "next/link";
import { useDeletePermissionById } from "../api/permission-query";

const permissionColumns: ColumnDef<Permission>[] = [
    {
        header: "NAME",
        accessorKey: "name",
        cell: ({ row }) => <div className="w-48 truncate">{row.original.name}</div>,
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
        header: "UPDATED ON",
        accessorKey: "updatedAt",
        cell: ({ row }) => (
            <span className="text-[#6B7280]">
                {dayjs(row.original.updatedAt).format("DD-MM-YYYY")}
            </span>
        ),
    },

    {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => <ActionColumn permission={row.original} />,
    },
];

const ActionColumn = ({ permission }: { permission: Permission }) => {
    const { userDetails } = useAuthStore();
    const currentUser = userDetails as Admin;
    const { mutate: deletePermission, isPending: isDeleting } = useDeletePermissionById();

    let showActions = true;

    if (currentUser.role == AdminRole.AGENT) {
        showActions = false;
    }

    return (
        <div className="flex space-x-4 justify-end">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href={`/dashboard/permissions/${permission.id}`}>
                            <Button size="icon" variant="ghost" aria-label="Edit Permission">
                                <Pencil className="w-5 h-5" />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit Permission Details</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Delete Permission"
                            onClick={() => deletePermission(permission.id!.toString())}
                        >
                            {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash className="w-5 h-5" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete Permission</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default permissionColumns;