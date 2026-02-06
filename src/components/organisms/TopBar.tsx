"use client";

import { ThemeToggle } from "../atoms/ThemeToggle";
import { Button } from "../atoms/Button";
import { Bell, Search, Menu } from "lucide-react";

export function TopBar() {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 z-30">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="hidden md:flex items-center text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Dashboard</span>
                    <span className="mx-2">/</span>
                    <span>Overview</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                <div className="w-px h-6 bg-border mx-2"></div>
                <ThemeToggle />
                <div className="ml-2 h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 ring-2 ring-background"></div>
            </div>
        </header>
    );
}
