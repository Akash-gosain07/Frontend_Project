# Premium Sales Dashboard

A modern, high-performance sales dashboard built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project follows **Atomic Design** principles for a scalable and maintainable codebase.

## Features

- 📊 **Interactive Charts**: Powered by Recharts (Area, Bar, Line, Pie).
- 🎨 **Premium UI**: Glassmorphism, smooth gradients, and dark mode aesthetics.
- ⚡ **Atomic Architecture**: Components organized into Atoms, Molecules, and Organisms.
- 📅 **Historical Data**: View sales data for 2022, 2023, and 2024 with dynamic growth calculation.
- 📱 **Responsive Design**: Fully optimized for all device sizes.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, clsx, tailwind-merge
- **Charts**: Recharts
- **Icons**: Lucide React

## Setup Instructions

1.  **Clone the repository** (or navigate to the project folder):
    ```bash
    cd sales-dashboard
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the dashboard**:
    Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/
│   ├── atoms/            # Basic building blocks (Buttons, Cards, Title)
│   ├── molecules/        # Composite components (StatCard, YearSelector)
│   ├── organisms/        # Complex sections (SalesChart, DashboardHeader)
│   └── templates/        # Page layouts
├── lib/                  # Utilities and Mock Data
```

## Atomic Design Implementation

-   **Atoms**: `Card`, `Button`, `Title` - Smallest indivisible units.
-   **Molecules**: `StatCard`, `YearSelector` - Groups of atoms working together.
-   **Organisms**: `SalesChart`, `SalesDistribution` - Complex UI sections forming distinct parts of the interesting interface.
