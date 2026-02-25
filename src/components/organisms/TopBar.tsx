"use client";

import { useState } from "react";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { Button } from "../atoms/Button";
import { Bell, Search, Menu } from "lucide-react";

interface TopBarProps {
    onMenuClick?: () => void;
    onSearch?: (query: string) => void;
}

export function TopBar({ onMenuClick, onSearch }: TopBarProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

    const notifications = [
        { id: 1, title: "New Sale", time: "2m ago", read: false },
        { id: 2, title: "Monthly Report Ready", time: "1h ago", read: true },
        { id: 3, title: "Customer Review", time: "2h ago", read: false },
    ];

    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 z-30">
            <div className="flex items-center gap-4 flex-1">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="flex-1 max-w-md relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search metrics or months..."
                        className="w-full bg-secondary/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground relative"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
                    </Button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 border-b border-border flex justify-between items-center">
                                <h3 className="font-semibold text-sm">Notifications</h3>
                                <button className="text-xs text-primary hover:underline">Mark all read</button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map(n => (
                                    <div key={n.id} className="p-4 hover:bg-secondary/50 cursor-pointer transition-colors flex items-start gap-3">
                                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${n.read ? 'bg-transparent' : 'bg-primary'}`}></div>
                                        <div>
                                            <p className="text-sm font-medium">{n.title}</p>
                                            <p className="text-xs text-muted-foreground">{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-px h-6 bg-border mx-2"></div>
                <ThemeToggle />
                <div className="ml-2 h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 ring-2 ring-background cursor-pointer hover:opacity-80 transition-all"></div>
            </div>
        </header>
    );
}
