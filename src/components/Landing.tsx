import { Button } from "./ui/button";
import { ArrowRight, BarChart3, TrendingUp, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#1B1B1B] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1760537549234-65a2c3f045c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBraXRjaGVuJTIwaW5ncmVkaWVudHN8ZW58MXx8fHwxNzYxNzUyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B1B1B]/95 via-[#1B1B1B]/90 to-[#1B1B1B]/80 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Logo Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5B041]/10 border border-[#F5B041]/30 rounded-full">
                <BarChart3 className="w-5 h-5 text-[#F5B041]" />
                <span className="text-[#F5B041] text-sm">GastroMetrics</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl leading-tight">
                  Optimiza la rentabilidad de tu menú con{" "}
                  <span className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] bg-clip-text text-transparent">
                    datos inteligentes
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Analiza costos, márgenes y desperdicio en tiempo real con GastroMetrics.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-[#F5B041] to-[#F5B041]/80 hover:from-[#F5B041]/90 hover:to-[#F5B041]/70 text-[#1B1B1B] px-8 py-6 rounded-xl shadow-lg shadow-[#F5B041]/20 transition-all duration-300 hover:shadow-[#F5B041]/40 hover:scale-105"
                >
                  Entrar al Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700">
                <div>
                  <div className="text-3xl text-[#2ECC71]">98%</div>
                  <div className="text-sm text-gray-400 mt-1">Precisión</div>
                </div>
                <div>
                  <div className="text-3xl text-[#F5B041]">+45%</div>
                  <div className="text-sm text-gray-400 mt-1">Ahorro</div>
                </div>
                <div>
                  <div className="text-3xl text-white">2.5k+</div>
                  <div className="text-sm text-gray-400 mt-1">Restaurantes</div>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F5B041]/20 to-[#2ECC71]/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-[#2A2A2A] rounded-2xl shadow-2xl p-6 border border-gray-700">
                {/* Mini Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#2ECC71]"></div>
                      <span className="text-sm text-gray-400">En vivo</span>
                    </div>
                    <div className="text-sm text-gray-400">Dashboard</div>
                  </div>

                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1B1B1B] p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
                        <span>Ganancia</span>
                      </div>
                      <div className="text-2xl text-white">$12,430</div>
                      <div className="text-xs text-[#2ECC71] mt-1">+18% vs mes anterior</div>
                    </div>
                    <div className="bg-[#1B1B1B] p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <PieChart className="w-4 h-4 text-[#F5B041]" />
                        <span>Margen</span>
                      </div>
                      <div className="text-2xl text-white">32%</div>
                      <div className="text-xs text-[#F5B041] mt-1">Promedio</div>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="bg-[#1B1B1B] p-4 rounded-xl border border-gray-700">
                    <div className="text-sm text-gray-400 mb-3">Tendencia semanal</div>
                    <div className="flex items-end gap-2 h-24">
                      {[65, 72, 68, 85, 78, 92, 88].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#F5B041] to-[#2ECC71] rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Top Dishes */}
                  <div className="bg-[#1B1B1B] p-4 rounded-xl border border-gray-700">
                    <div className="text-sm text-gray-400 mb-3">Top Platos</div>
                    <div className="space-y-2">
                      {['Risotto de Hongos', 'Salmón a la Parrilla', 'Pasta Carbonara'].map((dish, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{dish}</span>
                          <span className="text-[#2ECC71]">{38 - i * 2}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 GastroMetrics — Datos que impulsan tu cocina.
          </p>
        </div>
      </footer>
    </div>
  );
}
