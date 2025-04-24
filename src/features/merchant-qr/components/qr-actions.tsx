"use client";

import { RefreshCw, Info, Plus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { QRGenerateForm } from './qr-generate-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DialogClose } from '@radix-ui/react-dialog';
import { useRef } from 'react';
import { useCreateMerchantQr } from '../api/merchant-qr-query';
interface CreateQRValues {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    upiId: string;
    qrLimit: string;
}


export const QuickActions = () => {
    const createMutation = useCreateMerchantQr();

    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const handleGenerateNewQR = async (values: CreateQRValues): Promise<void> => {
        try {
            const updatedValues = {
                ...values,
                qrLimit: Number(values.qrLimit), // Convert qrLimit to number
            };
            await createMutation.mutateAsync(updatedValues);
        } catch (error) {
            console.error('Error generating QR:', error);
        }
    };
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate New QR
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogClose ref={closeButtonRef} />
                <ScrollArea className="h-[80vh]">
                    <QRGenerateForm onSubmit={handleGenerateNewQR} isGenerating={createMutation.isPending} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};