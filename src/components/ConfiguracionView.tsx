import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Settings, Database, RefreshCw, Download, AlertTriangle } from "lucide-react";
import { resetData } from "../lib/api";
import { toast } from "sonner@2.0.3";

export function ConfiguracionView() {
  async function handleResetData() {
    if (!confirm('¿Está seguro de reiniciar todos los datos? Esta acción no se puede deshacer.')) return;
    
    try {
      await resetData();
      toast.success('Datos reiniciados correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error resetting data:', error);
      toast.error('Error al reiniciar los datos');
    }
  }

  function handleExportData() {
    try {
      const data = {
        ingredientes: localStorage.getItem('gastrometrics_ingredientes'),
        platos: localStorage.getItem('gastrometrics_platos'),
        ventas: localStorage.getItem('gastrometrics_ventas'),
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gastrometrics-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success('Datos exportados correctamente');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Error al exportar los datos');
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto bg-[#0F0F0F]">
      <div>
        <h2 className="text-white">Configuración</h2>
        <p className="text-gray-400 text-sm mt-1">Administra la configuración del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Info */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#F5B041]" />
              Información del Sistema
            </CardTitle>
            <CardDescription className="text-gray-400">
              Detalles de la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Versión</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Almacenamiento</span>
              <span className="text-white">LocalStorage</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Restaurante</span>
              <span className="text-white">Restaurante Madrid</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Plan</span>
              <span className="text-[#F5B041]">Premium</span>
            </div>
          </CardContent>
        </Card>

        {/* Database Management */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[#2ECC71]" />
              Gestión de Datos
            </CardTitle>
            <CardDescription className="text-gray-400">
              Backup y restauración
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleExportData}
              className="w-full bg-[#2A2A2A] border border-gray-700 text-white hover:bg-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Datos
            </Button>
            
            <div className="bg-orange-400/10 border border-orange-400/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <div className="text-orange-400 text-sm">Zona de peligro</div>
                  <div className="text-gray-400 text-xs mt-1">
                    Reiniciar todos los datos eliminará ingredientes, platos y ventas.
                  </div>
                </div>
              </div>
              <Button
                onClick={handleResetData}
                className="w-full mt-3 bg-orange-400/20 border border-orange-400/30 text-orange-400 hover:bg-orange-400/30"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reiniciar Datos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Documentation */}
      <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Documentación de API</CardTitle>
          <CardDescription className="text-gray-400">
            Endpoints disponibles para integración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Platos */}
            <div>
              <h4 className="text-white mb-3">Platos</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 bg-[#2A2A2A] p-3 rounded-lg">
                  <span className="px-2 py-1 bg-[#2ECC71] text-[#1B1B1B] rounded text-xs">GET</span>
                  <code className="text-gray-300">/platos</code>
                  <span className="text-gray-400 ml-auto">Listar todos los platos</span>
                </div>
                <div className="flex items-center gap-3 bg-[#2A2A2A] p-3 rounded-lg">
                  <span className="px-2 py-1 bg-[#2ECC71] text-[#1B1B1B] rounded text-xs">GET</span>
                  <code className="text-gray-300">/platos/:id</code>
                  <span className="text-gray-400 ml-auto">Ver detalle de un plato</span>
                </div>
                <div className="flex items-center gap-3 bg-[#2A2A2A] p-3 rounded-lg">
                  <span className="px-2 py-1 bg-[#F5B041] text-[#1B1B1B] rounded text-xs">POST</span>
                  <code className="text-gray-300">/platos</code>
                  <span className="text-gray-400 ml-auto">Registrar un nuevo plato</span>
                </div>
                <div className="flex items-center gap-3 bg-[#2A2A2A] p-3 rounded-lg">
                  <span className="px-2 py-1 bg-orange-400 text-[#1B1B1B] rounded text-xs">PUT</span>
                  <code className="text-gray-300">/platos/:id</code>
                  <span className="text-gray-400 ml-auto">Editar costos e ingredientes</span>
                </div>
              </div>
            </div>

            {/* Ventas */}
            <div>
              <h4 className="text-white mb-3">Ventas</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 bg-[#2A2A2A] p-3 rounded-lg">
                  <span className="px-2 py-1 bg-[#F5B041] text-[#1B1B1B] rounded text-xs">POST</span>
                  <code className="text-gray-300">/ventas</code>
                  <span className="text-gray-400 ml-auto">Registrar una venta</span>
                </div>
                <div className="flex items-center gap-3 bg-[#2A2A2A] p-3 rounded-lg">
                  <span className="px-2 py-1 bg-[#2ECC71] text-[#1B1B1B] rounded text-xs">GET</span>
                  <code className="text-gray-300">/ventas</code>
                  <span className="text-gray-400 ml-auto">Listar todas las ventas</span>
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div>
              <h4 className="text-white mb-3">Dashboard</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 bg-[#2A2A2A] p-3 rounded-lg">
                  <span className="px-2 py-1 bg-[#2ECC71] text-[#1B1B1B] rounded text-xs">GET</span>
                  <code className="text-gray-300">/dashboard/kpis</code>
                  <span className="text-gray-400 ml-auto">Obtener KPIs y métricas</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2A2A2A] p-4 rounded-lg mt-6">
              <div className="text-sm text-gray-400 mb-2">Ejemplo de respuesta KPIs:</div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "gananciaTotal": 12430,
  "gananciaPromedio": 295,
  "margenPromedio": 68,
  "platosActivos": 42,
  "platosRentables": 38,
  "platosRevisar": 4,
  "ahorroPotencial": 1845,
  "topPlatosMenosRentables": [
    {
      "nombre": "Pasta Alfredo",
      "costo": 4.5,
      "venta": 12.0,
      "margen": 62.5,
      "trend": "down"
    }
  ],
  "evolucionCostos": [...],
  "evolucionIngredientes": [...]
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
