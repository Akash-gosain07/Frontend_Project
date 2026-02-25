"use client";

import { Card } from "../atoms/Card";
import { Title } from "../atoms/Title";
import { MonthlySales } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useTheme } from "next-themes";

interface SalesDistributionProps {
    data: MonthlySales[];
}

export function SalesDistribution({ data }: SalesDistributionProps) {
    const { theme } = useTheme();

    const quarterlyData = [
        { name: "Q1", value: data.slice(0, 3).reduce((acc, curr) => acc + curr.sales, 0) },
        { name: "Q2", value: data.slice(3, 6).reduce((acc, curr) => acc + curr.sales, 0) },
        { name: "Q3", value: data.slice(6, 9).reduce((acc, curr) => acc + curr.sales, 0) },
        { name: "Q4", value: data.slice(9, 12).reduce((acc, curr) => acc + curr.sales, 0) },
    ];

    const COLORS = ["#3b82f6", "#ec4899", "#8b5cf6", "#10b981"];
    const tooltipBg = theme === 'dark' ? "#1e293b" : "#ffffff";
    const tooltipText = theme === 'dark' ? "#f8fafc" : "#0f172a";
    const tooltipBorder = theme === 'dark' ? "#334155" : "#e2e8f0";

    return (
        <Card className="h-[400px] flex flex-col">
            <Title size="sm" className="mb-4">Sales Distribution (Pie Chart)</Title>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={quarterlyData}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {quarterlyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: "8px" }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
