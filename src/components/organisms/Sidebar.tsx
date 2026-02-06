"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Settings, HelpCircle, BarChart2 } from "lucide-react";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border hidden md:flex flex-col p-6 z-40">
            <div className="mb-8 flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <BarChart2 className="text-primary-foreground h-5 w-5" />
                </div>
                <Title size="md" className="text-xl">DashProps</Title>
            </div>

            <nav className="flex-1 space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3 bg-secondary/50 text-foreground font-semibold">
                    <LayoutDashboard size={20} />
                    Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <Users size={20} />
                    Customers
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <Settings size={20} />
                    Settings
                </Button>
            </nav>

            <div className="mt-auto pt-6 border-t border-border">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <HelpCircle size={20} />
                    Help Center
                </Button>
            </div>
        </aside>
    );
}
