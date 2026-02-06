"use client";

import { useState, useMemo } from "react";
import { salesData } from "@/lib/mockData";
import { Title } from "@/components/atoms/Title";
import { YearSelector } from "@/components/molecules/YearSelector";
import { StatCard } from "@/components/molecules/StatCard";
import { SalesChart } from "@/components/organisms/SalesChart";
import { SalesDistribution } from "@/components/organisms/SalesDistribution";
import { Sidebar } from "@/components/organisms/Sidebar";
import { TopBar } from "@/components/organisms/TopBar";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const years = Object.keys(salesData).sort((a, b) => b.localeCompare(a));

  const currentYearData = salesData[selectedYear];

  // Calculate Totals
  const totals = useMemo(() => {
    return currentYearData.reduce(
      (acc, curr) => ({
        sales: acc.sales + curr.sales,
        profit: acc.profit + curr.profit,
        customers: acc.customers + curr.customers,
      }),
      { sales: 0, profit: 0, customers: 0 }
    );
  }, [currentYearData]);

  // Calculate Growth
  const previousYear = (parseInt(selectedYear) - 1).toString();
  const previousTotals = useMemo(() => {
    if (!salesData[previousYear]) return null;
    return salesData[previousYear].reduce(
      (acc, curr) => ({
        sales: acc.sales + curr.sales,
        profit: acc.profit + curr.profit,
        customers: acc.customers + curr.customers,
      }),
      { sales: 0, profit: 0, customers: 0 }
    );
  }, [previousYear]);

  const calculateGrowth = (current: number, previous: number | undefined) => {
    if (!previous) return 0;
    return parseFloat((((current - previous) / previous) * 100).toFixed(1));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />

      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
        <TopBar />

        <main className="flex-1 p-6 md:p-8 space-y-8 mt-16">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Title size="lg" className="mb-1">Sales Overview</Title>
              <p className="text-muted-foreground">Track your performance key metrics.</p>
            </div>
            <YearSelector
              years={years}
              selectedYear={selectedYear}
              onSelect={setSelectedYear}
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Revenue"
              value={`$${totals.sales.toLocaleString()}`}
              trend={previousTotals ? calculateGrowth(totals.sales, previousTotals.sales) : undefined}
              icon="dollar"
            />
            <StatCard
              title="Total Profit"
              value={`$${totals.profit.toLocaleString()}`}
              trend={previousTotals ? calculateGrowth(totals.profit, previousTotals.profit) : undefined}
              icon="trend"
            />
            <StatCard
              title="Total Customers"
              value={totals.customers.toLocaleString()}
              trend={previousTotals ? calculateGrowth(totals.customers, previousTotals.customers) : undefined}
              icon="users"
            />
          </div>

          {/* Main Chart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesChart data={currentYearData} year={selectedYear} />
            </div>
            <div className="lg:col-span-1">
              <SalesDistribution data={currentYearData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
