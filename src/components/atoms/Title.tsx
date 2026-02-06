import { cn } from "@/lib/utils";
import React from "react";

interface TitleProps {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "default" | "gradient";
}

export function Title({ children, className, size = "md", variant = "default" }: TitleProps) {
    const sizes = {
        sm: "text-lg font-semibold",
        md: "text-2xl font-bold",
        lg: "text-3xl font-extrabold tracking-tight",
        xl: "text-4xl font-extrabold tracking-tight lg:text-5xl",
    };

    const variants = {
        default: "text-foreground",
        gradient: "text-gradient", // Defined in globals.css
    };

    return (
        <h1 className={cn(sizes[size], variants[variant], className)}>
            {children}
        </h1>
    );
}
