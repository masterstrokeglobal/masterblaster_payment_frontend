"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetTransactionById } from "@/features/transaction/query/transactions-queries";
import { Transaction, TransactionStatus, TransactionType } from "@/models/transaction";
import dayjs from "dayjs";
import { ArrowDownCircle, ArrowUpCircle, Building2, Calendar, Mail, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const TransactionViewPage = () => {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetTransactionById(id!.toString());

  const transaction = useMemo(() => {
    return new Transaction(data?.data?.transaction);
  }, [data]);

  if (isLoading) return <LoadingScreen>Loading transaction...</LoadingScreen>;

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return "bg-green-500";
      case TransactionStatus.FAILED:
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const formatDate = (date: Date) => {
    return dayjs(date).format("DD MMM, YYYY hh:mm A");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Transaction Details
            </CardTitle>
            <Badge
              variant="secondary"
              className={`${getStatusColor(transaction.status)} text-white`}
            >
              {transaction.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Transaction Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {transaction.type === TransactionType.DEPOSIT ? (
                    <ArrowUpCircle className="text-green-500" />
                  ) : (
                    <ArrowDownCircle className="text-red-500" />
                  )}
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">{transaction.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Amount:</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Platform Fee:</span>
                  <span>
                    {formatCurrency(transaction.platformFeeAmount)} (
                    {transaction.platformFeePercentage}%)
                  </span>
                </div>
                {transaction.pgId && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Payment Gateway ID:</span>
                    <span className="font-mono">{transaction.pgId}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Created:</span>
                  <span>{formatDate(transaction.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Updated:</span>
                  <span>{formatDate(transaction.updatedAt)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Merchant Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Merchant Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">Company:</span>
                    <span>{transaction.merchant.companyName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Contact:</span>
                    <span>{transaction.merchant.name}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email:</span>
                    <span>{transaction.merchant.email}</span>
                  </div>
                  {transaction.merchant.companyGSTNumber && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">GST Number:</span>
                      <span className="font-mono">{transaction.merchant.companyGSTNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionViewPage;