"use client";

import { useState, useMemo, useEffect } from "react";
import { salesData, MonthlySales } from "@/lib/mockData";
import { Title } from "@/components/atoms/Title";
import { YearSelector } from "@/components/molecules/YearSelector";
import { StatCard } from "@/components/molecules/StatCard";
import { SalesChart } from "@/components/organisms/SalesChart";
import { SalesDistribution } from "@/components/organisms/SalesDistribution";
import { Sidebar } from "@/components/organisms/Sidebar";
import { TopBar } from "@/components/organisms/TopBar";
import { cn } from "@/lib/utils"; // Assuming cn utility is available here

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [threshold, setThreshold] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isLive, setIsLive] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const [liveData, setLiveData] = useState(salesData);

  const years = Object.keys(salesData).sort((a, b) => b.localeCompare(a));

  // Live data simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        setLiveData(prev => {
          const newData = { ...prev };
          const currentYear = newData[selectedYear];
          const randomIndex = Math.floor(Math.random() * currentYear.length);
          const monthData = { ...currentYear[randomIndex] };

          // Add random variation (-5% to +5%)
          const variation = 1 + (Math.random() * 0.1 - 0.05);
          monthData.sales = Math.round(monthData.sales * variation);
          monthData.profit = Math.round(monthData.profit * variation);

          const newYearData = [...currentYear];
          newYearData[randomIndex] = monthData;
          newData[selectedYear] = newYearData;
          return newData;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLive, selectedYear]);

  const currentYearData = useMemo(() => {
    let data = liveData[selectedYear];

    // Threshold filter
    if (threshold !== "" && !isNaN(Number(threshold))) {
      data = data.filter(item => item.sales >= Number(threshold));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(item =>
        item.month.toLowerCase().includes(query) ||
        item.sales.toString().includes(query)
      );
    }

    return data;
  }, [selectedYear, threshold, searchQuery, liveData]);

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
    if (!liveData[previousYear]) return null;
    return liveData[previousYear].reduce(
      (acc, curr) => ({
        sales: acc.sales + curr.sales,
        profit: acc.profit + curr.profit,
        customers: acc.customers + curr.customers,
      }),
      { sales: 0, profit: 0, customers: 0 }
    );
  }, [previousYear, liveData]);

  const calculateGrowth = (current: number, previous: number | undefined) => {
    if (!previous) return 0;
    return parseFloat((((current - previous) / previous) * 100).toFixed(1));
  };

  const handleReset = () => {
    setThreshold("");
    setSearchQuery("");
    setSelectedYear("2024");
    setLiveData(salesData);
    showToast("Dashboard reset successful");
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab !== "Dashboard") {
      showToast(`${tab} page is coming soon!`);
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onItemClick={handleTabClick}
      />

      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          onSearch={setSearchQuery}
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 mt-16">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Title size="lg" className="mb-1">Sales Overview</Title>
                {isLive && (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider animate-pulse border border-red-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    Live
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">Track your performance key metrics in real-time.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              {/* Live Mode Toggle */}
              <button
                onClick={() => {
                  setIsLive(!isLive);
                  showToast(isLive ? "Live updates paused" : "Live updates active");
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border",
                  isLive
                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                    : "bg-secondary text-muted-foreground border-transparent hover:border-border"
                )}
              >
                {isLive ? "Stop Live" : "Start Live"}
              </button>

              <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1 w-full sm:w-auto">
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Threshold:</span>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="Min Sales"
                  className="bg-transparent border-none text-sm focus:outline-none w-24 h-8"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <YearSelector
                  years={years}
                  selectedYear={selectedYear}
                  onSelect={setSelectedYear}
                />
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors h-10"
                >
                  Reset
                </button>
              </div>
            </div>
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

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-2xl z-[100] animate-in slide-in-from-right-full font-medium flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
          {toast.message}
        </div>
      )}
    </div>
  );
}
