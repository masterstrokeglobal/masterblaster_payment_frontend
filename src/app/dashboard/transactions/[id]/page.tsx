"use client";

import React, { useMemo } from "react";
import LoadingScreen from "@/components/common/loading-screen";
import { useParams, useRouter } from "next/navigation";
import { Transaction, TransactionType } from "@/models/transaction";
import TransactionEditForm from "@/features/transaction/transaction-form";
import { useConfirmWithdrawal, useGetTransactionById, useUpdateTransactionById } from "@/features/transaction/query/transactions-queries";

const EditTransactionPage = () => {
    const params = useParams();
    const { id } = params;
    const { data, isLoading, isSuccess } = useGetTransactionById(id!.toString());
    const { mutate, isPending } = useUpdateTransactionById();
    const { mutate: withdrawl, isPending: confirmPending } = useConfirmWithdrawal();
    const router = useRouter();

    const transaction = useMemo(() => {
        return new Transaction(data?.data?.transaction);
    }, [data]);

    const onSubmit = (updatedData: any) => {

        if (transaction.type == TransactionType.DEPOSIT) {
            mutate({
                id,
                ...updatedData,
            }, {
                onSuccess: () => {
                    router.push("/dashboard/transactions");
                },
            });
        };

        if (transaction.type == TransactionType.WITHDRAWAL) {
            withdrawl({
                id,
                ...updatedData,
            }, {
                onSuccess: () => {
                    router.push("/dashboard/transactions");
                },
            });
        };
    };



    if (isLoading) return <LoadingScreen>Loading transaction...</LoadingScreen>;


    return (
        <>
            {isSuccess && data && (
                <TransactionEditForm
                    transaction={data.data.transaction}
                    onSubmit={onSubmit}
                    isLoading={isPending || confirmPending}
                />)}
        </>
    );

};

export default EditTransactionPage;
