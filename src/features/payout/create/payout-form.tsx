"use client";
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const payoutSchema = z.object({
    amount: z.coerce
        .number({ invalid_type_error: "Amount must be a number" })
        .min(1, "Amount is required")
        .max(1000000, "Amount exceeds maximum limit"),
    accountType: z.string().min(1, "Please select an account type"),
    accountDetails: z.string().min(1, "Account details are required"),
});

type PayoutFormValues = z.infer<typeof payoutSchema>;

const PaymentMethodOption = ({
    title,
    details,
    type,
    selected,
    onClick,
}: {
    title: string;
    details: string;
    type: string;
    selected: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center justify-between p-4 rounded-lg cursor-pointer",
                "bg-slate-100 transition-all duration-200",
                "hover:bg-slate-200",
                selected && "border-2 border-blue-500"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-3 h-3 rounded-full",
                    selected ? "bg-blue-500" : "border-2 border-gray-400"
                )} />
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-600">{details}</p>
                </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                {type}
            </div>
        </div>
    );
};

interface PayoutRequestFormProps {
    onSubmit: (data: PayoutFormValues) => void;
    isLoading?: boolean;
    walletBalance: number;
}

const PayoutRequestForm = ({
    onSubmit,
    isLoading,
    walletBalance
}: PayoutRequestFormProps) => {
    const form = useForm<PayoutFormValues>({
        resolver: zodResolver(payoutSchema),
        defaultValues: {
            amount: 0,
            accountType: '',
            accountDetails: '',
        }
    });

    const { control, handleSubmit } = form;

    const paymentMethods = [
        {
            id: '1',
            title: 'Bank Account',
            details: 'Direct bank transfer • 2-3 business days',
            type: 'BANK'
        },
        {
            id: '2',
            title: 'UPI',
            details: 'Instant transfer to UPI ID',
            type: 'UPI'
        }
    ];

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">Available Balance</Label>
                        <Wallet className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold">${walletBalance.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Available for withdrawal</p>
                    </div>
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount</Label>
                    <Controller
                        control={control}
                        name="amount"
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="Enter amount"
                                    className={cn(error && "border-red-500")}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Select Payment Method</Label>
                    <Controller
                        control={control}
                        name="accountType"
                        render={({ field, fieldState: { error } }) => (
                            <div className="space-y-2">
                                {paymentMethods.map((method) => (
                                    <PaymentMethodOption
                                        key={method.id}
                                        title={method.title}
                                        details={method.details}
                                        type={method.type}
                                        selected={field.value === method.id}
                                        onClick={() => field.onChange(method.id)}
                                    />
                                ))}
                                {error && (
                                    <p className="text-red-500 text-sm">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="accountDetails">Account Details</Label>
                    <Controller
                        control={control}
                        name="accountDetails"
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <Input
                                    {...field}
                                    placeholder="Enter account number or UPI ID"
                                    className={cn(error && "border-red-500")}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing Request
                        </>
                    ) : (
                        "Request Payout"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default PayoutRequestForm;