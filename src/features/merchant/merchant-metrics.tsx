"use client"

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, CreditCardIcon, DollarSignIcon } from "lucide-react"

// API function to fetch metrics data
const fetchMetricsData = async () => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/dashboard/metrics')
    if (!response.ok) {
        throw new Error('Failed to fetch metrics')
    }
    return response.json()
}

export default function MetricsRow() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboardMetrics'],
        queryFn: fetchMetricsData,
        // Example fallback data if needed during loading
        placeholderData: {
            totalCollection: 0,
            totalPayout: 0,
            payinBalance: 0,
            payoutBalance: 0
        }
    })

    // You can handle loading and error states
    if (error) {
        console.error('Error fetching metrics:', error)
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Collection Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Collection</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-blue-950 flex items-center justify-center">
                        <ArrowDownIcon className="h-4 w-4 text-white" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isLoading ? "Loading..." : data?.totalCollection.toLocaleString() || 0}
                    </div>
                </CardContent>
            </Card>

            {/* Total Payout Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Payout</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center">
                        <ArrowUpIcon className="h-4 w-4 text-white" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isLoading ? "Loading..." : data?.totalPayout.toLocaleString() || 0}
                    </div>
                </CardContent>
            </Card>

            {/* Payin Balance Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Payin Balance</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <CreditCardIcon className="h-4 w-4 text-white" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isLoading ? "Loading..." : `₹ ${data?.payinBalance.toLocaleString() || 0}`}
                    </div>
                </CardContent>
            </Card>

            {/* Payout Balance Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Payout Balance</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                        <DollarSignIcon className="h-4 w-4 text-white" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isLoading ? "Loading..." : `₹ ${data?.payoutBalance.toLocaleString() || 0}`}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}