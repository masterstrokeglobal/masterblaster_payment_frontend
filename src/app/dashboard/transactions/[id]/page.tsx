"use client";

import React, { useMemo } from "react";
import LoadingScreen from "@/components/common/loading-screen";
import { useParams, useRouter } from "next/navigation";
import { Transaction, TransactionType } from "@/models/transaction";
import TransactionEditForm from "@/features/transaction/transaction-form";
import { useConfirmWithdrawal, useGetTransactionById, useUpdateTransactionById } from "@/features/transaction/query/transactions-queries";
import WithdrawDetailsRecord from "@/models/withdrawl-details";
import Merchant from "@/models/merchant";
import { MerchantDetailsCard, WithdrawalDetailsCard } from "@/features/merchant/merchant-card-small";

const EditTransactionPage = () => {
    const params = useParams();
    const { id } = params;
    const { data, isLoading, isSuccess } = useGetTransactionById(id!.toString());
    const { mutate, isPending } = useUpdateTransactionById();
    const { mutate: withdrawl, isPending: confirmPending } = useConfirmWithdrawal();
    const router = useRouter();

    const transaction = useMemo(() => {
        return new Transaction(data?.data);
    }, [data]);


    const withdrawlDetails = useMemo(() => {
        if (data?.data.withdrawDetails) return new WithdrawDetailsRecord(data?.data.withdrawDetails);
        return null;
    }, [data]);

    const merchant = useMemo(() => {
        return new Merchant(data?.data.merchant);
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
                <div className="grid md:grid-cols-2 gap-8">
                    {withdrawlDetails && <WithdrawalDetailsCard withdrawDetails={withdrawlDetails} />}
                    <MerchantDetailsCard merchant={merchant} />
                    <TransactionEditForm
                        transaction={data.data}
                        onSubmit={onSubmit}
                        isLoading={isPending || confirmPending}
                    />
                </ div>
            )}
        </>
    );

};

export default EditTransactionPage;
