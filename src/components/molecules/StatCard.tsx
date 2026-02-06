import { Card } from "../atoms/Card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: number;
    icon?: "dollar" | "users" | "trend";
    subtext?: string;
}

export function StatCard({ title, value, trend, icon = "dollar", subtext }: StatCardProps) {
    const icons = {
        dollar: DollarSign,
        users: Users,
        trend: TrendingUp,
    };

    const Icon = icons[icon];
    const isPositive = trend && trend > 0;

    return (
        <Card className="flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-foreground">
                <Icon size={80} />
            </div>

            <div className="flex justify-between items-start z-10">
                <div className="p-2 bg-secondary rounded-lg text-primary">
                    <Icon size={24} />
                </div>
                {trend !== undefined && (
                    <div className={cn("flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                        isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>

            <div className="z-10">
                <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
                <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                {subtext && <p className="text-muted-foreground text-xs mt-2">{subtext}</p>}
            </div>
        </Card>
    );
}
