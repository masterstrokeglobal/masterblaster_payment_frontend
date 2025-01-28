"use client";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Users,
    UserCheck,
    Wallet,
    ArrowDownToLine,
    Percent,
    BanknoteIcon,
    LucideIcon,
} from 'lucide-react';
import { useDashboardStats } from '@/features/user/data/user-queries';

// Define prop types for MetricCard
interface MetricCardProps {
    title: string;
    value: number;
    prefix?: string;
    icon: LucideIcon; // Type for icons from lucide-react
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, prefix = '₹', icon: Icon }) => {
    return (
        <Card className="relative overflow-hidden backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300 border-none shadow-md hover:shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-blue-500/5 rounded-full" />
            <div className="absolute bottom-0 left-0 w-16 h-16 -mb-6 -ml-6 bg-blue-500/5 rounded-full" />
            <CardContent className="relative p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                        <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                        {title}
                    </p>
                </div>
                <div className="pl-1">
                    <p className="text-3xl font-bold tracking-tight text-gray-900">
                        {prefix}
                        {value}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

const Dashboard: React.FC = () => {
    const { data, isLoading } = useDashboardStats();

    const stats = data?.data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const totalMerchant = stats?.totalMerchants || 0;
    const totalMerchantBalance = stats?.totalMerchantBalance || 0;
    const totalDepositBalance = stats?.totalDepositAmount || 0;
    const totalWithdrawal = stats?.totalWithdrawalAmount || 0;
    return (
        <div className="p-8 pt-12 bg-gradient-to-br min-h-screen">
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
            </header>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Primary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MetricCard
                        title="Total Merchants"
                        value={totalMerchant}
                        icon={Users}
                        prefix=''
                    />
                    <MetricCard
                        title="Total Deposit Balance"
                        value={totalDepositBalance}
                        icon={BanknoteIcon}
                    />

                    <MetricCard
                        title="Total Balance"
                        value={totalMerchantBalance}
                        icon={Wallet}
                    />

                    <MetricCard
                        title="Total Withdrawal"
                        value={totalWithdrawal}
                        icon={ArrowDownToLine}
                    />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
