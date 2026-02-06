"use client";

import { Card } from "../atoms/Card";
import { Title } from "../atoms/Title";
import { MonthlySales } from "@/lib/mockData";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
} from "recharts";
import { useState } from "react";
import { Button } from "../atoms/Button";
import { BarChart3, LineChart as LineIcon, PieChart } from "lucide-react";
import { useTheme } from "next-themes";

interface SalesChartProps {
    data: MonthlySales[];
    year: string;
}

export function SalesChart({ data, year }: SalesChartProps) {
    const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");
    const { theme } = useTheme();

    // Determine colors based on theme is tricky with Recharts as it needs hex
    // A simple hack is to check system preference or rely on CSS variables if supported (Recharts support for CSS vars is limited)
    // For now, we will use hardcoded values that work well in both or look good on dark/light

    const gridColor = theme === 'dark' ? "#334155" : "#e2e8f0";
    const textColor = theme === 'dark' ? "#94a3b8" : "#64748b";
    const tooltipBg = theme === 'dark' ? "#1e293b" : "#ffffff";
    const tooltipText = theme === 'dark' ? "#f8fafc" : "#0f172a";
    const tooltipBorder = theme === 'dark' ? "#334155" : "#e2e8f0";

    return (
        <Card className="flex flex-col gap-6 h-[500px]">
            <div className="flex justify-between items-center">
                <Title size="md">Sales Overview - {year}</Title>
                <div className="flex gap-1 bg-secondary p-1 rounded-lg">
                    <Button
                        variant={chartType === "area" ? "primary" : "ghost"}
                        size="icon"
                        onClick={() => setChartType("area")}
                        className="h-8 w-8"
                    >
                        <PieChart size={16} className="rotate-90" />
                    </Button>
                    <Button
                        variant={chartType === "bar" ? "primary" : "ghost"}
                        size="icon"
                        onClick={() => setChartType("bar")}
                        className="h-8 w-8"
                    >
                        <BarChart3 size={16} />
                    </Button>
                    <Button
                        variant={chartType === "line" ? "primary" : "ghost"}
                        size="icon"
                        onClick={() => setChartType("line")}
                        className="h-8 w-8"
                    >
                        <LineIcon size={16} />
                    </Button>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === "area" ? (
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis dataKey="month" stroke={textColor} />
                            <YAxis stroke={textColor} />
                            <Tooltip
                                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: "8px" }}
                                itemStyle={{ color: tooltipText }}
                            />
                            <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
                            <Area type="monotone" dataKey="profit" stroke="#ec4899" fillOpacity={1} fill="url(#colorProfit)" />
                        </AreaChart>
                    ) : chartType === "bar" ? (
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis dataKey="month" stroke={textColor} />
                            <YAxis stroke={textColor} />
                            <Tooltip
                                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: "8px" }}
                                cursor={{ fill: theme === 'dark' ? "#334155" : "#f1f5f9", opacity: 0.4 }}
                            />
                            <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="profit" fill="#ec4899" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    ) : (
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis dataKey="month" stroke={textColor} />
                            <YAxis stroke={textColor} />
                            <Tooltip
                                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: "8px" }}
                            />
                            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} />
                            <Line type="monotone" dataKey="profit" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, fill: "#ec4899" }} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
