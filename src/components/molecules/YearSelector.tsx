import { Button } from "../atoms/Button";

interface YearSelectorProps {
    years: string[];
    selectedYear: string;
    onSelect: (year: string) => void;
}

export function YearSelector({ years, selectedYear, onSelect }: YearSelectorProps) {
    return (
        <div className="flex gap-1 bg-secondary p-1 rounded-lg border border-border">
            {years.map((year) => (
                <Button
                    key={year}
                    variant={selectedYear === year ? "primary" : "ghost"}
                    onClick={() => onSelect(year)}
                    className="text-sm px-3 py-1.5 h-8"
                >
                    {year}
                </Button>
            ))}
        </div>
    );
}
