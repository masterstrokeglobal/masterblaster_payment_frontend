import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ApiRequest, { ApiRequestStatus } from "@/models/api-request";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Check, Clock, Edit, Trash, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteAPIServiceRequest, useUpdateAPIServiceRequest } from "../api/api-service-query";

const getStatusConfig = (status: ApiRequestStatus) => {
  switch (status) {
    case ApiRequestStatus.APPROVED:
      return {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <Check className="h-3 w-3 text-green-500 mr-1" />,
        label: "Approved"
      };
    case ApiRequestStatus.REJECTED:
      return {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: <X className="h-3 w-3 text-red-500 mr-1" />,
        label: "Rejected"
      };
    default:
      return {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-3 w-3 text-yellow-500 mr-1" />,
        label: "Pending"
      };
  }
};

const ActionCell = ({ id, status }: { id: number, status: ApiRequestStatus }) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<ApiRequestStatus | null>(null);

    const { mutate: deleteApiRequest, isPending: isDeleteLoading } = useDeleteAPIServiceRequest();
    const { mutate: updateApiRequest, isPending: isUpdateLoading } = useUpdateAPIServiceRequest();

    const handleDelete = () => {
        deleteApiRequest(id, {
            onSuccess: () => {
                toast.success("API Request deleted successfully");
                setOpenDeleteDialog(false);
            },
            onError: (error) => {
                toast.error("Failed to delete API request. Please try again.");
            }
        });
    };

    const handleUpdate = (newStatus: ApiRequestStatus) => {
        updateApiRequest({ id, status: newStatus }, {
            onSuccess: () => {
                toast.success(`API request status updated to ${getStatusConfig(newStatus).label}`);
                setOpenUpdateDialog(false);
            },
            onError: (error) => {
                toast.error("Failed to update API request status. Please try again.");
            }
        });
    };

    // If already approved or rejected, disable actions
    const isStatusFinal = status === ApiRequestStatus.APPROVED || status === ApiRequestStatus.REJECTED;

    return (
        <div className="flex items-center gap-2">
            <TooltipProvider>
                {/* Status Update Dialog */}
                <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isStatusFinal || isUpdateLoading}
                                    className="px-2"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Update Status</span>
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Update Request Status</p>
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Update API Request Status</DialogTitle>
                            <DialogDescription>
                                {isStatusFinal
                                    ? "This request has already been approved or rejected and cannot be modified."
                                    : "Select a new status for this API request."}
                            </DialogDescription>
                        </DialogHeader>

                        {!isStatusFinal && (
                            <>
                                <div className="flex flex-col gap-4 py-4">
                                    <div className="flex justify-center gap-4">
                                        <Button
                                            variant={selectedStatus === ApiRequestStatus.APPROVED ? "default" : "outline"}
                                            onClick={() => setSelectedStatus(ApiRequestStatus.APPROVED)}
                                            className={`flex-1 ${selectedStatus === ApiRequestStatus.APPROVED ? "bg-green-600 hover:bg-green-700" : ""}`}
                                        >
                                            <Check className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant={selectedStatus === ApiRequestStatus.REJECTED ? "destructive" : "outline"}
                                            onClick={() => setSelectedStatus(ApiRequestStatus.REJECTED)}
                                            className="flex-1"
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="ghost" onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
                                    <Button
                                        onClick={() => selectedStatus && handleUpdate(selectedStatus)}
                                        disabled={!selectedStatus || isUpdateLoading}
                                        className={selectedStatus === ApiRequestStatus.APPROVED ? "bg-green-600 hover:bg-green-700" : ""}
                                    >
                                        {isUpdateLoading ? "Updating..." : "Confirm"}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={isDeleteLoading}
                                    className="px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete Request</p>
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                Delete API Request
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this API request? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-end">
                            <Button variant="ghost" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isDeleteLoading}
                            >
                                {isDeleteLoading ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TooltipProvider>
        </div>
    );
};

// Update the column definition to include status
const  apiRequestColumns: ColumnDef<ApiRequest>[] = [
    {
        header: "Merchant",
        accessorKey: "merchant",
        cell: ({ row }) => <div className="font-medium">{row.original.merchant?.name}</div>
    },
    {
        header: "API Request",
        accessorKey: "apiRequest",
        cell: ({ row }) => <div className="font-medium">{row.original.apiList?.name}</div>
    },
    {
        header: "Request Date & Time",
        accessorKey: "requestDate",
        cell: ({ row }) => {
            const date = dayjs(row.original.createdAt);
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{date.format("DD MMM YYYY")}</span>
                    <span className="text-sm text-gray-500">{date.format("HH:mm a")}</span>
                </div>
            );
        }
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.original.status as ApiRequestStatus;
            const { color, icon, label } = getStatusConfig(status);
            return (
                <Badge className={`${color} flex items-center w-fit whitespace-nowrap`} variant="outline">
                    {icon}
                    {label}
                </Badge>
            );
        }
    },
    {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => <ActionCell id={row.original.id!} status={row.original.status!} />
    }
];

export default apiRequestColumns;