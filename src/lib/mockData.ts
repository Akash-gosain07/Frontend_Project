export interface MonthlySales {
  month: string;
  sales: number;
  profit: number;
  customers: number;
}

export type SalesData = {
  [year: string]: MonthlySales[];
};

export const salesData: SalesData = {
  "2022": [
    { month: "Jan", sales: 12000, profit: 4000, customers: 150 },
    { month: "Feb", sales: 15000, profit: 5200, customers: 180 },
    { month: "Mar", sales: 18000, profit: 6000, customers: 220 },
    { month: "Apr", sales: 16000, profit: 5500, customers: 200 },
    { month: "May", sales: 21000, profit: 7500, customers: 250 },
    { month: "Jun", sales: 25000, profit: 9000, customers: 300 },
    { month: "Jul", sales: 24000, profit: 8500, customers: 290 },
    { month: "Aug", sales: 26000, profit: 9200, customers: 310 },
    { month: "Sep", sales: 28000, profit: 10000, customers: 350 },
    { month: "Oct", sales: 23000, profit: 8000, customers: 280 },
    { month: "Nov", sales: 32000, profit: 12000, customers: 400 },
    { month: "Dec", sales: 38000, profit: 15000, customers: 500 },
  ],
  "2023": [
    { month: "Jan", sales: 28000, profit: 9000, customers: 340 },
    { month: "Feb", sales: 32000, profit: 11000, customers: 380 },
    { month: "Mar", sales: 35000, profit: 12500, customers: 420 },
    { month: "Apr", sales: 33000, profit: 11500, customers: 400 },
    { month: "May", sales: 40000, profit: 14000, customers: 480 },
    { month: "Jun", sales: 45000, profit: 16000, customers: 550 },
    { month: "Jul", sales: 48000, profit: 17500, customers: 580 },
    { month: "Aug", sales: 50000, profit: 18000, customers: 600 },
    { month: "Sep", sales: 47000, profit: 16500, customers: 560 },
    { month: "Oct", sales: 52000, profit: 19000, customers: 620 },
    { month: "Nov", sales: 60000, profit: 22000, customers: 750 },
    { month: "Dec", sales: 75000, profit: 28000, customers: 900 },
  ],
  "2024": [
    { month: "Jan", sales: 65000, profit: 24000, customers: 800 },
    { month: "Feb", sales: 68000, profit: 25000, customers: 820 },
    { month: "Mar", sales: 72000, profit: 27000, customers: 880 },
    { month: "Apr", sales: 70000, profit: 26000, customers: 850 },
    { month: "May", sales: 85000, profit: 32000, customers: 1100 },
    { month: "Jun", sales: 90000, profit: 34000, customers: 1200 },
    { month: "Jul", sales: 95000, profit: 36000, customers: 1300 },
    { month: "Aug", sales: 92000, profit: 35000, customers: 1250 },
    { month: "Sep", sales: 98000, profit: 38000, customers: 1400 },
    { month: "Oct", sales: 88000, profit: 33000, customers: 1150 },
    { month: "Nov", sales: 78000, profit: 29000, customers: 950 },
    { month: "Dec", sales: 82000, profit: 30500, customers: 1000 },
  ],
};
