import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { getIngredientes, createIngrediente, updateIngrediente, deleteIngrediente, type Ingrediente } from "../lib/api";
import { toast } from "sonner@2.0.3";

export function CostosView() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIngrediente, setEditingIngrediente] = useState<Ingrediente | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    unidad: 'kg' as 'kg' | 'litro' | 'unidad',
    costoUnitario: '',
    stock: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getIngredientes();
      setIngredientes(data);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }

  function handleOpenDialog(ingrediente?: Ingrediente) {
    if (ingrediente) {
      setEditingIngrediente(ingrediente);
      setFormData({
        nombre: ingrediente.nombre,
        unidad: ingrediente.unidad,
        costoUnitario: String(ingrediente.costoUnitario),
        stock: String(ingrediente.stock),
      });
    } else {
      setEditingIngrediente(null);
      setFormData({
        nombre: '',
        unidad: 'kg',
        costoUnitario: '',
        stock: '',
      });
    }
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.nombre || !formData.costoUnitario) {
      toast.error('Complete los campos requeridos');
      return;
    }

    try {
      const ingredienteData = {
        nombre: formData.nombre,
        unidad: formData.unidad,
        costoUnitario: parseFloat(formData.costoUnitario),
        stock: parseFloat(formData.stock) || 0,
      };

      if (editingIngrediente) {
        await updateIngrediente(editingIngrediente.id, ingredienteData);
        toast.success('Ingrediente actualizado correctamente');
      } else {
        await createIngrediente(ingredienteData);
        toast.success('Ingrediente creado correctamente');
      }

      await loadData();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving ingrediente:', error);
      toast.error('Error al guardar el ingrediente');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Está seguro de eliminar este ingrediente?')) return;
    
    try {
      await deleteIngrediente(id);
      toast.success('Ingrediente eliminado correctamente');
      await loadData();
    } catch (error) {
      console.error('Error deleting ingrediente:', error);
      toast.error('Error al eliminar el ingrediente');
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto bg-[#0F0F0F]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Gestión de Costos</h2>
          <p className="text-gray-400 text-sm mt-1">Administra ingredientes y precios</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] text-[#1B1B1B] hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Ingrediente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1B1B1B] border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>{editingIngrediente ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Complete los datos del ingrediente
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre *</Label>
                <Input
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Salmón Fresco"
                  className="bg-[#2A2A2A] border-gray-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Unidad de Medida *</Label>
                  <Select
                    value={formData.unidad}
                    onValueChange={(value: 'kg' | 'litro' | 'unidad') => setFormData({ ...formData, unidad: value })}
                  >
                    <SelectTrigger className="bg-[#2A2A2A] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B1B1B] border-gray-700 text-white">
                      <SelectItem value="kg">Kilogramo (kg)</SelectItem>
                      <SelectItem value="litro">Litro</SelectItem>
                      <SelectItem value="unidad">Unidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Costo Unitario ($) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.costoUnitario}
                    onChange={(e) => setFormData({ ...formData, costoUnitario: e.target.value })}
                    placeholder="0.00"
                    className="bg-[#2A2A2A] border-gray-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stock Disponible</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  className="bg-[#2A2A2A] border-gray-700 text-white"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-gray-700 text-white hover:bg-gray-800">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] text-[#1B1B1B] hover:opacity-90">
                  {editingIngrediente ? 'Actualizar' : 'Crear'}
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
            <CardDescription className="text-gray-400">Total Ingredientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{ingredientes.length}</div>
            <div className="text-sm text-gray-400 mt-1">Registrados</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Inversión en Stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">
              ${ingredientes.reduce((total, ing) => total + (ing.costoUnitario * ing.stock), 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-400 mt-1">Valor inventario</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Costo Promedio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">
              ${ingredientes.length > 0 ? (ingredientes.reduce((total, ing) => total + ing.costoUnitario, 0) / ingredientes.length).toFixed(2) : '0'}
            </div>
            <div className="text-sm text-gray-400 mt-1">Por ingrediente</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Lista de Ingredientes</CardTitle>
          <CardDescription className="text-gray-400">
            Ingredientes y sus costos actuales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Ingrediente</TableHead>
                <TableHead className="text-gray-400">Unidad</TableHead>
                <TableHead className="text-gray-400 text-right">Costo Unitario</TableHead>
                <TableHead className="text-gray-400 text-right">Stock</TableHead>
                <TableHead className="text-gray-400 text-right">Valor Stock</TableHead>
                <TableHead className="text-gray-400 text-right">Última Act.</TableHead>
                <TableHead className="text-gray-400 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientes.map((ingrediente) => (
                <TableRow key={ingrediente.id} className="border-gray-800 hover:bg-[#2A2A2A]/50">
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#F5B041]" />
                      {ingrediente.nombre}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{ingrediente.unidad}</TableCell>
                  <TableCell className="text-right text-gray-300">${ingrediente.costoUnitario.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={`${
                      ingrediente.stock > 50 ? 'text-[#2ECC71]' :
                      ingrediente.stock > 20 ? 'text-[#F5B041]' :
                      'text-orange-400'
                    }`}>
                      {ingrediente.stock.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    ${(ingrediente.costoUnitario * ingrediente.stock).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-gray-400 text-sm">
                    {new Date(ingrediente.fechaActualizacion).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => handleOpenDialog(ingrediente)}
                        size="icon"
                        variant="ghost"
                        className="text-[#F5B041] hover:text-[#F5B041] hover:bg-[#F5B041]/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(ingrediente.id)}
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
