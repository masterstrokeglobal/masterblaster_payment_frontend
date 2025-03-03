"use client";

import { Card, CardContent } from '@/components/ui/card';
import { useDashboardStats } from '@/features/user/data/user-queries';
import {
    Activity,
    ArrowDownToLine,
    BanknoteIcon,
    TrendingUp,
    Users,
    Wallet
} from 'lucide-react';
import React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Define prop types for MetricCard
interface MetricCardProps {
    title: string;
    value: number;
    prefix?: string;
    icon: React.ElementType;
    trend?: number;
    trendLabel?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
    title, 
    value, 
    prefix = '₹', 
    icon: Icon,
    trend,
    trendLabel
}) => {
    const isTrendPositive = trend && trend > 0;
    const isTrendNegative = trend && trend < 0;
    
    return (
        <Card className="relative overflow-hidden backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300 border-none shadow-md hover:shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-blue-500/5 rounded-full" />
            <div className="absolute bottom-0 left-0 w-16 h-16 -mb-6 -ml-6 bg-blue-500/5 rounded-full" />
            <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                            <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                            {title}
                        </p>
                    </div>
                    {trend && (
                        <div className={`flex items-center text-sm ${isTrendPositive ? 'text-green-600' : isTrendNegative ? 'text-red-600' : 'text-gray-600'}`}>
                            <TrendingUp className={`w-4 h-4 mr-1 ${isTrendPositive ? '' : isTrendNegative ? 'transform rotate-180' : ''}`} />
                            <span>{Math.abs(trend)}% {trendLabel || (isTrendPositive ? 'increase' : 'decrease')}</span>
                        </div>
                    )}
                </div>
                <div className="pl-1">
                    <p className="text-3xl font-bold tracking-tight text-gray-900">
                        {prefix && value !== 0 ? prefix : ''}{value.toLocaleString()}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

// Sample chart data for visualization
const generateChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
        name: month,
        userDeposit: Math.floor(Math.random() * 50000) + 10000,
        userWithdrawal: Math.floor(Math.random() * 30000) + 5000,
        merchantPayout: Math.floor(Math.random() * 20000) + 8000,
    }));
};

const TransactionSummaryChart = () => {
    const chartData = generateChartData();
    
    return (
        <Card className="col-span-2 backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300 border-none shadow-md hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Transaction Summary</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-600">Deposits</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-xs text-gray-600">Withdrawals</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-xs text-gray-600">Payouts</span>
                        </div>
                    </div>
                </div>
                <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area 
                                type="monotone" 
                                dataKey="userDeposit" 
                                stackId="1" 
                                stroke="#3b82f6" 
                                fill="#3b82f6" 
                                fillOpacity={0.6} 
                            />
                            <Area 
                                type="monotone" 
                                dataKey="userWithdrawal" 
                                stackId="1" 
                                stroke="#ef4444" 
                                fill="#ef4444" 
                                fillOpacity={0.6} 
                            />
                            <Area 
                                type="monotone" 
                                dataKey="merchantPayout" 
                                stackId="1" 
                                stroke="#f59e0b" 
                                fill="#f59e0b" 
                                fillOpacity={0.6} 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

const Dashboard: React.FC = () => {
    const { data, isLoading } = useDashboardStats();
    
    const stats = data?.data;
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                </div>
            </div>
        );
    }
    
    const totalMerchant = stats?.totalMerchants || 0;
    const totalMerchantBalance = stats?.totalMerchantBalance || 0;
    const totalDepositBalance = stats?.totalDepositAmount || 0;
    const totalWithdrawal = stats?.totalWithdrawalAmount || 0;

    // Calculate a simple percentage for demonstration
    const depositGrowth = 8.5; // Example growth percentage
    const withdrawalGrowth = -3.2; // Example decline percentage
    
    return (
        <div className="p-8 pt-12 bg-gradient-to-br from-blue-50 to-white min-h-screen">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
                    <p className="text-gray-600 mt-1">Overview of your financial metrics</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-100">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Last updated: Today</span>
                </div>
            </header>
            
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Primary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total Merchants"
                        value={totalMerchant}
                        icon={Users}
                        prefix=""
                        trend={4.2}
                        trendLabel="this month"
                    />
                    <MetricCard
                        title="Total Deposit Balance"
                        value={totalDepositBalance}
                        icon={BanknoteIcon}
                        trend={depositGrowth}
                    />
                    <MetricCard
                        title="Total Merchant Balance"
                        value={totalMerchantBalance}
                        icon={Wallet}
                        trend={2.8}
                    />
                    <MetricCard
                        title="Total Withdrawal"
                        value={totalWithdrawal}
                        icon={ArrowDownToLine}
                        trend={withdrawalGrowth}
                    />
                </div>
                
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <TransactionSummaryChart />
                    
                    <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300 border-none shadow-md hover:shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Transaction Distribution</h3>
                            <div style={{ height: "300px" }} className="flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { name: 'Deposits', value: totalDepositBalance },
                                            { name: 'Withdrawals', value: totalWithdrawal },
                                            { name: 'Balance', value: totalMerchantBalance },
                                        ]}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;