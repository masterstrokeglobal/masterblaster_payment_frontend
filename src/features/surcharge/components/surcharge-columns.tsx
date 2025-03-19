import { ColumnDef } from "@tanstack/react-table";
import Surcharge from "@/models/surcharge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { AlertDialog, AlertDialogTitle, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogFooter, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useDeleteSurchargeQuery } from "../api/surcharge-query";

const surchargeColumns: ColumnDef<Surcharge>[] = [
    {
        header: "Merchant",
        accessorKey: "merchant",
        cell: ({ row }) => {
            return <div>{row.original.merchant?.name ?? "Unknown Merchant"}</div>;
        },
    },
    {
        header: "Start Range",
        accessorKey: "startRange",
        cell: ({ row }) => {
            return <div>{row.original.startRange}</div>;
        },
    },
    {
        header: "End Range",
        accessorKey: "endRange",
        cell: ({ row }) => {
            return <div>{row.original.endRange}</div>;
        },
    },
    {
        header: "Surcharge",
        accessorKey: "surcharge",
        cell: ({ row }) => {
            return <div>{row.original.surcharge}</div>;
        },
    },

    {
        header: "Flat",
        accessorKey: "flat",
        cell: ({ row }) => {
            return <Badge variant={row.original.flat ? "default" : "secondary"}>{row.original.flat ? "Yes" : "No"}</Badge>;
        },
    },
    {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => {
            const id = row.original.id;
            if (!id) return null;
            return <ActionCell id={id} />
        }
    }
];

const ActionCell = ({ id }: { id: number }) => {
    const { mutate: deleteSurcharge, isPending } = useDeleteSurchargeQuery();
    return <div className="flex gap-2">
        <Link href={`/dashboard/surcharge/${id}/edit`}>
            <Button variant="outline">
                <Pencil />
            </Button>
        </Link>

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <Button variant="destructive"
                        disabled={isPending}
                        onClick={() => deleteSurcharge(id)}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
}
export default surchargeColumns;
