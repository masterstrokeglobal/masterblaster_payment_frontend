"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction, TransactionStatus } from "@/models/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TransactionStatusAlert from "./transaction-status";
import FormProvider from "@/components/form/form-provider";
import FormGroupSelect from "@/components/form/form-select";

// Schema for transaction form validation
export const transactionEditSchema = z.object({
    status: z.enum([TransactionStatus.PENDING, TransactionStatus.COMPLETED, TransactionStatus.FAILED]),
});

export type TransactionFormValues = z.infer<typeof transactionEditSchema>;

type TransactionEditProps = {
    transaction: Transaction;
    showForm?: boolean;
    onSubmit: (data: TransactionFormValues) => void;
    isLoading?: boolean;
};

const TransactionEditForm = ({ transaction, onSubmit, isLoading, showForm = false }: TransactionEditProps) => {
    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionEditSchema),
        defaultValues: { status: TransactionStatus.FAILED },
    });

    const { control, handleSubmit } = form;
    const currentStatus = transaction.status
    return (
        <section className="container-main min-h-[60vh] max-w-xl">
            <Card className="shadow-none bg-background">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Transaction Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Read-only Transaction Details */}
                        <p className="text-gray-400"><strong className="text-primary">Type:</strong> {transaction.type}</p>
                        <p className="text-gray-400"><strong className="text-primary">Amount:</strong> ₹{transaction.amount}</p>
                        <p className="text-gray-400"><strong className="text-primary">PG ID:</strong> {transaction.pgId || "N/A"}</p>
                        <p className="text-gray-400"><strong className="text-primary">PlatFormFee %:</strong> {transaction.platformFeePercentage || 0}%</p>
                        <p className="text-gray-400"><strong className="text-primary">Created At:</strong> {new Date(transaction.createdAt).toLocaleDateString()}</p>
                    </div>
                    {(currentStatus === TransactionStatus.PENDING && showForm) && (
                        <FormProvider methods={form} onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                            <FormGroupSelect
                                control={control}
                                name="status"
                                defaultValue={TransactionStatus.COMPLETED.toString()}
                                label="Change Status"
                                options={[
                                    { label: "Completed", value: TransactionStatus.COMPLETED.toString() },
                                    { label: "Cancelled", value: TransactionStatus.FAILED.toString() },
                                ]}
                            />

                            <footer className="flex justify-end gap-4 mt-8">
                                <Button variant="outline" className="text-primary" type="submit" disabled={isLoading}>
                                    {isLoading ? "Updating..." : "Update Status"}
                                </Button>
                            </footer>
                        </FormProvider>
                    )}
                    {(currentStatus !== TransactionStatus.PENDING && showForm) && (
                        <TransactionStatusAlert currentStatus={currentStatus} />
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default TransactionEditForm;
