import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, ShoppingCart, Calendar, TrendingUp } from "lucide-react";
import { getVentas, getPlatos, createVenta, type Venta, type Plato, calcularCostoPlato, getIngredientes } from "../lib/api";
import { toast } from "sonner@2.0.3";

export function ReportesView() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    platoId: '',
    cantidad: '1',
    fecha: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [ventasData, platosData] = await Promise.all([
        getVentas(),
        getPlatos(),
      ]);
      setVentas(ventasData.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()));
      setPlatos(platosData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }

  function handleOpenDialog() {
    setFormData({
      platoId: platos.length > 0 ? platos[0].id : '',
      cantidad: '1',
      fecha: new Date().toISOString().split('T')[0],
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.platoId || !formData.cantidad) {
      toast.error('Complete los campos requeridos');
      return;
    }

    try {
      const plato = platos.find(p => p.id === formData.platoId);
      if (!plato) {
        toast.error('Plato no encontrado');
        return;
      }

      const ventaData = {
        platoId: formData.platoId,
        cantidad: parseInt(formData.cantidad),
        fecha: new Date(formData.fecha).toISOString(),
        total: plato.precioVenta * parseInt(formData.cantidad),
      };

      await createVenta(ventaData);
      toast.success('Venta registrada correctamente');
      await loadData();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving venta:', error);
      toast.error('Error al registrar la venta');
    }
  }

  // Calculate stats
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
  const ventasHoy = ventas.filter(v => {
    const today = new Date().toDateString();
    return new Date(v.fecha).toDateString() === today;
  });
  const totalHoy = ventasHoy.reduce((sum, v) => sum + v.total, 0);

  // Top platos vendidos
  const platoVentas = ventas.reduce((acc, venta) => {
    if (!acc[venta.platoId]) {
      acc[venta.platoId] = { cantidad: 0, total: 0 };
    }
    acc[venta.platoId].cantidad += venta.cantidad;
    acc[venta.platoId].total += venta.total;
    return acc;
  }, {} as Record<string, { cantidad: number; total: number }>);

  const topPlatos = Object.entries(platoVentas)
    .map(([platoId, data]) => {
      const plato = platos.find(p => p.id === platoId);
      return {
        plato: plato?.nombre || 'Desconocido',
        cantidad: data.cantidad,
        total: data.total,
      };
    })
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto bg-[#0F0F0F]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Reportes de Ventas</h2>
          <p className="text-gray-400 text-sm mt-1">Registra y analiza las ventas del restaurante</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog} className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] text-[#1B1B1B] hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Registrar Venta
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1B1B1B] border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Venta</DialogTitle>
              <DialogDescription className="text-gray-400">
                Complete los datos de la venta
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Plato *</Label>
                <Select
                  value={formData.platoId}
                  onValueChange={(value) => setFormData({ ...formData, platoId: value })}
                >
                  <SelectTrigger className="bg-[#2A2A2A] border-gray-700 text-white">
                    <SelectValue placeholder="Seleccione un plato" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1B1B1B] border-gray-700 text-white">
                    {platos.filter(p => p.activo).map((plato) => (
                      <SelectItem key={plato.id} value={plato.id}>
                        {plato.nombre} - ${plato.precioVenta.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cantidad *</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                    placeholder="1"
                    className="bg-[#2A2A2A] border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fecha *</Label>
                  <Input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="bg-[#2A2A2A] border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              {formData.platoId && (
                <div className="bg-[#2A2A2A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Total de la venta</div>
                  <div className="text-2xl text-[#2ECC71]">
                    ${((platos.find(p => p.id === formData.platoId)?.precioVenta || 0) * parseInt(formData.cantidad || '1')).toFixed(2)}
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-gray-700 text-white hover:bg-gray-800">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] text-[#1B1B1B] hover:opacity-90">
                  Registrar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#2ECC71]" />
              Ventas Totales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">${totalVentas.toFixed(0)}</div>
            <div className="text-sm text-gray-400 mt-1">{ventas.length} transacciones</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F5B041]" />
              Ventas de Hoy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">${totalHoy.toFixed(0)}</div>
            <div className="text-sm text-gray-400 mt-1">{ventasHoy.length} ventas</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
              Ticket Promedio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">
              ${ventas.length > 0 ? (totalVentas / ventas.length).toFixed(2) : '0'}
            </div>
            <div className="text-sm text-gray-400 mt-1">Por venta</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Platos */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Top 5 Platos Más Vendidos</CardTitle>
            <CardDescription className="text-gray-400">Por cantidad de unidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPlatos.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5B041] to-[#2ECC71] flex items-center justify-center">
                      <span className="text-sm text-[#1B1B1B]">{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-white">{item.plato}</div>
                      <div className="text-sm text-gray-400">{item.cantidad} unidades</div>
                    </div>
                  </div>
                  <div className="text-[#2ECC71]">${item.total.toFixed(0)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Ventas Recientes</CardTitle>
            <CardDescription className="text-gray-400">Últimas 10 transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {ventas.slice(0, 10).map((venta) => {
                const plato = platos.find(p => p.id === venta.platoId);
                return (
                  <div key={venta.id} className="flex items-center justify-between py-2 border-b border-gray-800">
                    <div>
                      <div className="text-white text-sm">{plato?.nombre || 'Desconocido'}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(venta.fecha).toLocaleDateString('es-ES')} - {venta.cantidad}x
                      </div>
                    </div>
                    <div className="text-[#2ECC71]">${venta.total.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Sales Table */}
      <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Historial Completo de Ventas</CardTitle>
          <CardDescription className="text-gray-400">
            {ventas.length} ventas registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Fecha</TableHead>
                <TableHead className="text-gray-400">Plato</TableHead>
                <TableHead className="text-gray-400 text-right">Cantidad</TableHead>
                <TableHead className="text-gray-400 text-right">Precio Unit.</TableHead>
                <TableHead className="text-gray-400 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ventas.slice(0, 50).map((venta) => {
                const plato = platos.find(p => p.id === venta.platoId);
                return (
                  <TableRow key={venta.id} className="border-gray-800 hover:bg-[#2A2A2A]/50">
                    <TableCell className="text-gray-300">
                      {new Date(venta.fecha).toLocaleDateString('es-ES', { 
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell className="text-white">{plato?.nombre || 'Desconocido'}</TableCell>
                    <TableCell className="text-right text-gray-300">{venta.cantidad}</TableCell>
                    <TableCell className="text-right text-gray-300">
                      ${plato ? plato.precioVenta.toFixed(2) : '0.00'}
                    </TableCell>
                    <TableCell className="text-right text-[#2ECC71]">${venta.total.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
