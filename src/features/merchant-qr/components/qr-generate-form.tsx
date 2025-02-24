"use client";

import { Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { merchantQrFormSchema, MerchantQrFormValues } from '../type';
import FormImage from '@/components/ui/form-image';
import FormInput from '@/components/form/form-input';
import FormSwitch from '@/components/form/form-switch';

interface QRGenerateFormProps {
    onSubmit: (values: MerchantQrFormValues) => Promise<void>;
    isGenerating: boolean;
    defaultValues?: Partial<MerchantQrFormValues>;
}

export const QRGenerateForm = ({ onSubmit, isGenerating, defaultValues }: QRGenerateFormProps) => {
    const form = useForm<MerchantQrFormValues>({
        resolver: zodResolver(merchantQrFormSchema),
        defaultValues: {
            accountName: defaultValues?.accountName ?? "",
            accountNumber: defaultValues?.accountNumber ?? "",
            bankName: defaultValues?.bankName ?? "",
            upiId: defaultValues?.upiId ?? "",
            ifscCode: defaultValues?.ifscCode ?? "",
            isActive: defaultValues?.isActive ?? true,
            qrCode: defaultValues?.qrCode ?? ""
        }
    });

    return (
        <>
            <DialogHeader>
                <DialogTitle>Generate New QR Code</DialogTitle>
                <DialogDescription>
                    Create a new QR code for your bank account
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput 
                        control={form.control} 
                        name='accountName' 
                        label='Account Name' 
                    />
                    
                    <FormInput 
                        control={form.control} 
                        name='accountNumber' 
                        label='Account Number' 
                    />
                    
                    <FormInput 
                        control={form.control} 
                        name='bankName' 
                        label='Bank Name' 
                    />
                    
                    <FormInput 
                        control={form.control} 
                        name='upiId' 
                        label='UPI ID' 
                    />
                    
                    <FormInput 
                        control={form.control} 
                        name='ifscCode' 
                        label='IFSC Code' 
                    />
                    
                    <FormSwitch
                        control={form.control}
                        name="isActive"
                        label="Active Status"
                        description="Set whether this QR code is active"
                    />
                    
                    <FormImage control={form.control} name='qrCode' />
                    
                    <DialogFooter>
                        <Button type="submit" disabled={isGenerating}>
                            {isGenerating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Generate QR
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};