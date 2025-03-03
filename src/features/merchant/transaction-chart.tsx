"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { name: "Jan", successful: 400, failed: 240, pending: 20 },
    { name: "Feb", successful: 500, failed: 280, pending: 30 },
    { name: "Mar", successful: 600, failed: 300, pending: 40 },
    { name: "Apr", successful: 700, failed: 320, pending: 50 },
    { name: "May", successful: 800, failed: 340, pending: 60 },
    { name: "Jun", successful: 900, failed: 360, pending: 70 },
    { name: "Jul", successful: 1000, failed: 380, pending: 80 },
    { name: "Aug", successful: 1100, failed: 400, pending: 90 },
    { name: "Sep", successful: 900, failed: 380, pending: 70 },
    { name: "Oct", successful: 700, failed: 360, pending: 50 },
    { name: "Nov", successful: 600, failed: 340, pending: 40 },
    { name: "Dec", successful: 500, failed: 320, pending: 30 },
]

export function TransactionChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
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
                    <Area type="monotone" dataKey="successful" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="failed" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="pending" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

