import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Landing } from "./components/Landing";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { Dashboard } from "./components/Dashboard";
import { PlatosView } from "./components/PlatosView";
import { CostosView } from "./components/CostosView";
import { ReportesView } from "./components/ReportesView";
import { ConfiguracionView } from "./components/ConfiguracionView";
import { CalculadoraView } from "./components/CalculadoraView";

function DashboardLayout() {
  return (
    <div className="h-screen flex bg-[#0F0F0F] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="platos" element={<PlatosView />} />
          <Route path="calculadora" element={<CalculadoraView />} />
          <Route path="costos" element={<CostosView />} />
          <Route path="reportes" element={<ReportesView />} />
          <Route path="configuracion" element={<ConfiguracionView />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: '#1B1B1B',
            border: '1px solid #374151',
            color: '#fff',
          },
        }}
      />
    </BrowserRouter>
  );
}
