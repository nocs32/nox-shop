"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { AggregateChartData } from "../utils";

interface ChartProps {
    data: {
        date: string;
        revenue: number;
    }[]
}

export function Chart({ data }: ChartProps) {
    const processedData = AggregateChartData(data);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" stroke="#3b82f6" activeDot={{ r: 8 }} dataKey="revenue" />
            </LineChart>
        </ResponsiveContainer>
    )
}