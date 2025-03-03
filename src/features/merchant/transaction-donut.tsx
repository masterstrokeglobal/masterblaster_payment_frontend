"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface TransactionDonutProps {
  successful?: number;
  pending?: number;
  failed?: number;
}

type DataItem = {
  name: string;
  value: number;
  color: string;
}

export function TransactionDonut({ 
  successful = 0, 
  pending = 0, 
  failed = 0 
}: TransactionDonutProps) {
  const data: DataItem[] = [
    { name: "Successful", value: successful, color: "#10b981" },
    { name: "Failed", value: failed, color: "#ef4444" },
    { name: "Pending", value: pending, color: "#f59e0b" },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium">Total</h3>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      
      <div className="flex flex-wrap gap-4 w-full">
        {data.map((item) => (
          <div 
            key={item.name} 
            className="flex  flex-1 items-center p-2 rounded-md"
            style={{ backgroundColor: `${item.color}20` }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="font-medium">{item.name}</span>
            </div>
            <span className="text-lg font-bold ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}