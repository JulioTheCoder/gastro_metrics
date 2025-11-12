import { BarChart3, UtensilsCrossed, DollarSign, TrendingUp, Settings } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'platos', icon: UtensilsCrossed, label: 'Platos' },
    { id: 'costos', icon: DollarSign, label: 'Costos' },
    { id: 'reportes', icon: TrendingUp, label: 'Reportes' },
    { id: 'configuracion', icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className="w-64 bg-[#1B1B1B] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#F5B041] to-[#2ECC71] rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-[#1B1B1B]" />
          </div>
          <span className="text-xl text-white">GastroMetrics</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#F5B041]/20 to-[#2ECC71]/20 text-[#F5B041] border border-[#F5B041]/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2ECC71] to-[#F5B041] rounded-full flex items-center justify-center">
            <span className="text-sm text-[#1B1B1B]">RM</span>
          </div>
          <div className="flex-1">
            <div className="text-sm text-white">Restaurante Madrid</div>
            <div className="text-xs text-gray-400">Plan Premium</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
