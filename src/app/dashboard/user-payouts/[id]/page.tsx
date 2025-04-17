"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormProvider from "@/components/form/form-provider";
import FormGroupSelect from "@/components/form/form-select";
import { useParams } from "next/navigation";
import { WithdrawalStatus, WithdrawalType } from "@/models/user-withdrawl";
import { useGetUserWithdrawalById, useUpdateUserWithdrawalStatus } from "@/features/user-withdrawl/api/user-withdrawl-query";
import { toast } from "sonner";
import { AlertCircle, Building2, CheckCircle2, Clock, User } from 'lucide-react';

export const withdrawalSchema = z.object({
    status: z.enum([WithdrawalStatus.PENDING, WithdrawalStatus.COMPLETED, WithdrawalStatus.FAILED]),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

const StatusBadge = ({ status }: { status: WithdrawalStatus }) => {
    const statusConfig = {
        [WithdrawalStatus.PENDING]: {
            color: 'bg-yellow-100 text-yellow-800',
            icon: <Clock className="w-4 h-4" />
        },
        [WithdrawalStatus.COMPLETED]: {
            color: 'bg-green-100 text-green-800',
            icon: <CheckCircle2 className="w-4 h-4" />
        },
        [WithdrawalStatus.FAILED]: {
            color: 'bg-red-100 text-red-800',
            icon: <AlertCircle className="w-4 h-4" />
        }
    };

    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status].color}`}>
            {statusConfig[status].icon}
            {status}
        </span>
    );
};

const UserWithdrawalEditForm = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetUserWithdrawalById(id?.toString());
    const updateWithdrawalStatus = useUpdateUserWithdrawalStatus();

    const withdrawal = data?.data;
    const form = useForm<WithdrawalFormValues>({
        resolver: zodResolver(withdrawalSchema),
        defaultValues: { status: WithdrawalStatus.PENDING },
    });

    const { handleSubmit, control } = form;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const onSubmit = async (data: WithdrawalFormValues) => {
        updateWithdrawalStatus.mutate(
            { withdrawalId: id as string, data },
            {
                onSuccess: () => toast.success("Withdrawal status updated successfully"),
                onError: (error) => toast.error(error.response?.data?.message || "Error updating status"),
            }
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Withdrawal Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className=" transition-shadow duration-300">
                    <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                            <User className="w-5 h-5 text-blue-500" />
                            User Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{withdrawal?.userName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{withdrawal?.userEmail}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Created Date</p>
                                <p className="font-medium">{new Date(withdrawal?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className=" transition-shadow duration-300">
                    <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                            <Building2 className="w-5 h-5 text-blue-500" />
                            Withdrawal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Amount</p>
                                <p className="font-medium text-lg">₹{withdrawal?.amount}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Type</p>
                                <p className="font-medium">{withdrawal?.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Current Status</p>
                                <StatusBadge status={withdrawal?.status} />
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                            <h3 className="text-sm font-medium text-gray-900 mb-4">
                                {withdrawal?.type === WithdrawalType.UPI ? 'UPI Details' : 'Bank Details'}
                            </h3>

                            {withdrawal?.type === WithdrawalType.UPI ? (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">UPI ID</p>
                                    <p className="font-medium">{withdrawal?.UPIId || "N/A"}</p>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Bank Name</p>
                                        <p className="font-medium">{withdrawal?.bankName || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Account Number</p>
                                        <p className="font-medium">{withdrawal?.accountNumber || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">IFSC Code</p>
                                        <p className="font-medium">{withdrawal?.ifscCode || "N/A"}</p>
                                    </div>
                                </div>
                            )}

                            {withdrawal?.status === WithdrawalStatus.PENDING && (
                                <div className="mt-6">
                                    <FormProvider methods={form} onSubmit={handleSubmit(onSubmit)}>
                                        <FormGroupSelect
                                            name="status"
                                            label="Update Status"
                                            control={control}
                                            options={Object.values(WithdrawalStatus).map((status) => ({
                                                label: status,
                                                value: status,
                                            }))}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={updateWithdrawalStatus.isPending}
                                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
                                        >
                                            {updateWithdrawalStatus.isPending ? "Updating..." : "Update Status"}
                                        </Button>
                                    </FormProvider>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserWithdrawalEditForm;