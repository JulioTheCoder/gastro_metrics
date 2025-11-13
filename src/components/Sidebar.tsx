import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, UtensilsCrossed, DollarSign, TrendingUp, Settings, X, Calculator } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();
  const [plansOpen, setPlansOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'platos', icon: UtensilsCrossed, label: 'Platos' },
    { id: 'calculadora', icon: Calculator, label: 'Calculadora' },
    { id: 'costos', icon: DollarSign, label: 'Costos' },
    { id: 'reportes', icon: TrendingUp, label: 'Reportes' },
    { id: 'configuracion', icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className="w-64 bg-[#1B1B1B] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#F5B041] to-[#2ECC71] rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-[#1B1B1B]" />
          </div>
          <span className="text-xl text-white">GastroMetrics</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const to = item.id === 'dashboard' ? '/dashboard' : `/dashboard/${item.id}`;

          return (
            <NavLink
              key={item.id}
              to={to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5B041]/20 to-[#2ECC71]/20 text-[#F5B041] border border-[#F5B041]/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setPlansOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#2ECC71] to-[#F5B041] rounded-full flex items-center justify-center">
            <span className="text-sm text-[#1B1B1B]">RM</span>
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm text-white">Restaurante Madrid</div>
            <div className="text-xs text-gray-400">Plan Premium</div>
          </div>
        </button>
      </div>

      {/* Plans Modal */}
      <Dialog open={plansOpen} onOpenChange={setPlansOpen}>
        <DialogContent className="bg-[#1B1B1B] border-gray-800 text-white w-[120vw] max-w-6xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Planes de Servicio</DialogTitle>
            <DialogDescription className="text-gray-400">
              Elige el plan que mejor se adapte a tu restaurante
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Plan Básico */}
            <Card className="bg-[#2A2A2A] border-gray-700 flex flex-col">
              <CardHeader>
                <CardTitle className="text-white">Básico</CardTitle>
                <CardDescription className="text-gray-400">Para empezar</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="text-3xl text-[#2ECC71]">
                  $9<span className="text-sm text-gray-400">/mes</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#2ECC71]" />
                    Hasta 50 platos
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#2ECC71]" />
                    Dashboard básico
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#2ECC71]" />
                    Reportes mensuales
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    ✕ Análisis avanzado
                  </li>
                </ul>
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white mt-4">
                  Seleccionar
                </Button>
              </CardContent>
            </Card>

            {/* Plan Premium (Destacado) */}
            <Card className="bg-gradient-to-br from-[#F5B041]/20 to-[#2ECC71]/20 border-[#F5B041]/50 flex flex-col ring-2 ring-[#F5B041]/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Premium</CardTitle>
                    <CardDescription className="text-gray-400">Lo más popular</CardDescription>
                  </div>
                  <span className="px-3 py-1 bg-[#F5B041]/20 border border-[#F5B041] rounded-full text-xs text-[#F5B041]">
                    Actual
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="text-3xl text-[#F5B041]">
                  $29<span className="text-sm text-gray-400">/mes</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#F5B041]" />
                    Hasta 500 platos
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#F5B041]" />
                    Dashboard completo
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#F5B041]" />
                    Reportes ilimitados
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#F5B041]" />
                    Análisis avanzado
                  </li>
                </ul>
                <Button className="w-full bg-[#F5B041] hover:bg-[#F5B041]/90 text-[#1B1B1B] mt-4">
                  Actual
                </Button>
              </CardContent>
            </Card>

            {/* Plan Empresarial */}
            <Card className="bg-[#2A2A2A] border-gray-700 flex flex-col">
              <CardHeader>
                <CardTitle className="text-white">Empresarial</CardTitle>
                <CardDescription className="text-gray-400">Para grandes operaciones</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="text-3xl text-[#2ECC71]">
                  $99<span className="text-sm text-gray-400">/mes</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#2ECC71]" />
                    Platos ilimitados
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#2ECC71]" />
                    API full access
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#2ECC71]" />
                    Soporte prioritario
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-[#2ECC71]" />
                    Integraciones custom
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-[#2ECC71] to-[#2ECC71]/80 hover:opacity-90 text-[#1B1B1B] mt-4">
                  Seleccionar
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
