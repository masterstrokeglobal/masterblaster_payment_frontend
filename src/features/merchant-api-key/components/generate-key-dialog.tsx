"use client";

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCreateMerchantApiKey } from '../api/merchant-api-query';
import ApiKeyGeneratorForm from './generate-key-form';

interface ApiKeyFormValues {
    ipAddress: string;
    mode: string;
}

interface CreateApiKeyDialogProps {
    children: React.ReactNode;  // For DialogTrigger
    merchantId?: number;        // Optional merchantId if needed for the API call
    onSuccess?: () => void;     // Optional callback for after successful creation
}

const CreateApiKeyDialog = ({
    children,
    merchantId,
    onSuccess
}: CreateApiKeyDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const { mutate, isPending } = useCreateMerchantApiKey();

    const onSubmit = (data: ApiKeyFormValues) => {
        // Prepare data for API call
        const apiKeyData = {
            ...data,
            merchantId
        };

        mutate(apiKeyData, {
            onSuccess: (response) => {
                setOpen(false);

                // Copy API key to clipboard if available in response
                if (response?.data.headerKey) {
                    navigator.clipboard.writeText(response.data.headerKey)
                        .then(() => {
                            toast.success("API key copied to clipboard");
                        })
                        .catch(() => {
                            toast.info("Please copy your API key now - it won't be shown again");
                        });
                }

                if (onSuccess) {
                    onSuccess();
                }
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create New API Key</DialogTitle>
                    <DialogDescription>
                        Configure and generate a new API key for merchant integration.
                    </DialogDescription>
                </DialogHeader>
                <Separator className="my-4" />
                <ApiKeyGeneratorForm
                    onSubmit={onSubmit}
                    isLoading={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreateApiKeyDialog;