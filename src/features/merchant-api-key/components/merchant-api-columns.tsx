"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MerchantApiKey, ApiKeyStatus } from "@/models/merchant-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Copy,
    CheckCircle2,
    XCircle,
    RefreshCw,
    MoreVertical
} from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActivateMerchantApiKey, useDeactivateMerchantApiKey, useRegenerateMerchantApiKey } from "../api/merchant-api-query";

const merchantApiKeyColumns: ColumnDef<MerchantApiKey>[] = [
    {
        accessorKey: "headerKey",
        header: "Header Key",
        cell: ({ row }) => {
            const apiKey = row.original;
            const copyToClipboard = () => {
                navigator.clipboard.writeText(apiKey.headerKey);
                toast.success("Header key copied to clipboard");
            };
            return (
                <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">
                        {apiKey.headerKey.substring(0, 8)}...
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        className="h-6 w-6"
                    >
                        <Copy size={14} />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "encryptionKey",
        header: "Encryption Key",
        cell: ({ row }) => {
            const apiKey = row.original;
            const copyToClipboard = () => {
                navigator.clipboard.writeText(apiKey.encryptionKey);
                toast.success("Encryption key copied to clipboard");
            };
            return (
                <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">
                        {apiKey.encryptionKey.substring(0, 8)}...
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        className="h-6 w-6"
                    >
                        <Copy size={14} />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "ipAddress",
        header: "IP Address",
        cell: ({ row }) => <span className="font-mono text-sm">{row.original.ipAddress}</span>,
    },
    {
        accessorKey: "mode",
        header: "Mode",
        cell: ({ row }) => (
            <Badge variant={row.original.mode === "LIVE MODE" ? "default" : "outline"}>
                {row.original.mode}
            </Badge>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                variant={row.original.status === ApiKeyStatus.ACTIVE ? "success" : "destructive"}
            >
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "generatedDate",
        header: "Generated Date",
        cell: ({ row }) => format(new Date(row.original.generatedDate), "MMM dd, yyyy HH:mm"),
    },
    {
        accessorKey: "lastUsedAt",
        header: "Last Used",
        cell: ({ row }) =>
            row.original.lastUsedAt
                ? format(new Date(row.original.lastUsedAt), "MMM dd, yyyy HH:mm")
                : "Never used",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const apiKey = row.original;
            const regenerateMutation = useRegenerateMerchantApiKey();
            const activateMutation = useActivateMerchantApiKey();
            const deactivateMutation = useDeactivateMerchantApiKey();

            const handleRegenerate = () => {
                regenerateMutation.mutate(apiKey.id);
            };

            const handleActivate = () => {
                activateMutation.mutate(apiKey.id);
            };

            const handleDeactivate = () => {
                deactivateMutation.mutate(apiKey.id);
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleRegenerate}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Regenerate Keys
                        </DropdownMenuItem>
                        {apiKey.status === ApiKeyStatus.ACTIVE ? (
                            <DropdownMenuItem onClick={handleDeactivate}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Deactivate
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={handleActivate}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Activate
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default merchantApiKeyColumns;