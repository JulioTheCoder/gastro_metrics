import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { Landing } from "./components/Landing";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { Dashboard } from "./components/Dashboard";
import { PlatosView } from "./components/PlatosView";
import { CostosView } from "./components/CostosView";
import { ReportesView } from "./components/ReportesView";
import { ConfiguracionView } from "./components/ConfiguracionView";

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');

  if (view === 'landing') {
    return <Landing onEnterDashboard={() => setView('dashboard')} />;
  }

  function renderContent() {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'platos':
        return <PlatosView />;
      case 'costos':
        return <CostosView />;
      case 'reportes':
        return <ReportesView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <>
      <div className="h-screen flex bg-[#0F0F0F] text-white overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          {renderContent()}
        </div>
      </div>
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
    </>
  );
}
