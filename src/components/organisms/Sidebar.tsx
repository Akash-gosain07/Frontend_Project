"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Settings, HelpCircle, BarChart2, Menu } from "lucide-react";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    activeTab?: string;
    onItemClick?: (tab: string) => void;
}

export function Sidebar({ isOpen, onClose, activeTab = "Dashboard", onItemClick }: SidebarProps) {
    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Customers", icon: Users },
        { name: "Settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col p-6 z-50 transition-transform duration-300 md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <BarChart2 className="text-primary-foreground h-5 w-5" />
                        </div>
                        <Title size="md" className="text-xl">DashProps</Title>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;
                        return (
                            <Button
                                key={item.name}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary font-semibold border-r-4 border-primary rounded-r-none"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                )}
                                onClick={() => onItemClick?.(item.name)}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Button>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-border">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                        onClick={() => onItemClick?.("Help Center")}
                    >
                        <HelpCircle size={20} />
                        Help Center
                    </Button>
                </div>
            </aside>
        </>
    );
}
