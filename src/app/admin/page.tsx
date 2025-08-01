import ChartsSection from "./Components/dashboard/ChartSection";
import KpiSection from "./Components/dashboard/KpiSection";
import QuickActionsSection from "./Components/dashboard/QuickActionsSection";

// app/(admin)/page.tsx
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      <p className="text-gray-600  mb-6 text-sm">Welcome back! Heres whats happening on your platform today.</p>

      <KpiSection/>
      <ChartsSection/>
      <QuickActionsSection/>
      
    </div>
    
  );
}
