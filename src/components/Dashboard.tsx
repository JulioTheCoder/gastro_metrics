import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { TrendingUp, TrendingDown, DollarSign, Percent, AlertCircle, Loader2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getDashboardKPIs, type DashboardKPIs } from "../lib/api";

export function Dashboard() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKPIs();
  }, []);

  async function loadKPIs() {
    setLoading(true);
    try {
      const data = await getDashboardKPIs();
      setKpis(data);
    } catch (error) {
      console.error('Error loading KPIs:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !kpis) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0F0F0F]">
        <Loader2 className="w-8 h-8 text-[#F5B041] animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto bg-[#0F0F0F]">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ganancia Total */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#2ECC71]" />
              Ganancia Total del Mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl text-white">${kpis.gananciaTotal.toLocaleString()}</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
                <span className="text-sm text-[#2ECC71]">
                  {kpis.evolucionCostos.length > 1 ? 
                    `+${Math.round((kpis.evolucionCostos[kpis.evolucionCostos.length - 1].ganancia / kpis.evolucionCostos[kpis.evolucionCostos.length - 2].ganancia - 1) * 100)}%` : 
                    '+0%'} vs mes anterior
                </span>
              </div>
              {/* Mini chart */}
              <div className="h-12 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpis.evolucionCostos.slice(-6)}>
                    <Line type="monotone" dataKey="ganancia" stroke="#2ECC71" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Margen Promedio */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400 flex items-center gap-2">
              <Percent className="w-4 h-4 text-[#F5B041]" />
              Margen Promedio por Plato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl text-white">{kpis.margenPromedio}%</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#F5B041]" />
                <span className="text-sm text-[#F5B041]">Promedio actual</span>
              </div>
              {/* Progress bars */}
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F5B041] to-[#2ECC71]" style={{ width: `${Math.min(kpis.margenPromedio, 100)}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-400">Target: 65%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platos Activos */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Platos en Menú</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl text-white">{kpis.platosActivos}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Activos actualmente</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-[#0F0F0F] p-2 rounded-lg">
                  <div className="text-lg text-[#2ECC71]">{kpis.platosRentables}</div>
                  <div className="text-xs text-gray-400">Rentables</div>
                </div>
                <div className="bg-[#0F0F0F] p-2 rounded-lg">
                  <div className="text-lg text-orange-400">{kpis.platosRevisar}</div>
                  <div className="text-xs text-gray-400">Revisar</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ahorro Potencial */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              Ahorro Potencial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl text-white">${kpis.ahorroPotencial.toLocaleString()}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-orange-400">Optimizando desperdicio</span>
              </div>
              <div className="bg-[#0F0F0F] p-3 rounded-lg mt-3">
                <div className="text-xs text-gray-400 mb-1">Recomendaciones</div>
                <div className="text-sm text-white">{kpis.platosRevisar} platos para revisar</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Costos vs Ventas */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Costos vs Ventas</CardTitle>
            <CardDescription className="text-gray-400">Comparativa mensual de ingresos y gastos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpis.evolucionCostos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis dataKey="mes" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1B1B1B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="ganancia" fill="#2ECC71" name="Ganancia" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="costos" fill="#F5B041" name="Costos" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Evolución de Costos por Ingrediente */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Evolución de Costos por Ingrediente</CardTitle>
            <CardDescription className="text-gray-400">Tendencias de precios semanales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpis.evolucionIngredientes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis dataKey="semana" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1B1B1B', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Legend />
                  {Object.keys(kpis.evolucionIngredientes[0] || {}).filter(k => k !== 'semana').map((key, i) => {
                    const colors = ['#F5B041', '#2ECC71', '#EF4444', '#8B5CF6'];
                    return (
                      <Line 
                        key={key} 
                        type="monotone" 
                        dataKey={key} 
                        stroke={colors[i % colors.length]} 
                        strokeWidth={2} 
                        name={key.charAt(0).toUpperCase() + key.slice(1)} 
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Platos Menos Rentables */}
      <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Top 5 Platos Menos Rentables</CardTitle>
          <CardDescription className="text-gray-400">Platos que requieren optimización de costos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Plato</TableHead>
                <TableHead className="text-gray-400 text-right">Costo</TableHead>
                <TableHead className="text-gray-400 text-right">Precio Venta</TableHead>
                <TableHead className="text-gray-400 text-right">Margen %</TableHead>
                <TableHead className="text-gray-400 text-right">Tendencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.topPlatosMenosRentables.map((dish, index) => (
                <TableRow key={index} className="border-gray-800 hover:bg-[#2A2A2A]/50">
                  <TableCell className="text-white">{dish.nombre}</TableCell>
                  <TableCell className="text-right text-gray-300">${dish.costo.toFixed(2)}</TableCell>
                  <TableCell className="text-right text-gray-300">${dish.venta.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={`${
                      dish.margen >= 68 ? 'text-[#2ECC71]' : 
                      dish.margen >= 65 ? 'text-[#F5B041]' : 
                      'text-orange-400'
                    }`}>
                      {dish.margen.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {dish.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-[#2ECC71] inline" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-orange-400 inline" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
