import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { getPlatos, getIngredientes, createPlato, updatePlato, deletePlato, calcularCostoPlato, calcularMargen, type Plato, type Ingrediente, type PlatoIngrediente } from "../lib/api";
import { toast } from "sonner@2.0.3";

export function PlatosView() {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlato, setEditingPlato] = useState<Plato | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precioVenta: '',
    categoria: '',
    activo: true,
    ingredientes: [] as PlatoIngrediente[],
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [platosData, ingredientesData] = await Promise.all([
        getPlatos(),
        getIngredientes(),
      ]);
      setPlatos(platosData);
      setIngredientes(ingredientesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }

  function handleOpenDialog(plato?: Plato) {
    if (plato) {
      setEditingPlato(plato);
      setFormData({
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        precioVenta: String(plato.precioVenta),
        categoria: plato.categoria,
        activo: plato.activo,
        ingredientes: plato.ingredientes,
      });
    } else {
      setEditingPlato(null);
      setFormData({
        nombre: '',
        descripcion: '',
        precioVenta: '',
        categoria: '',
        activo: true,
        ingredientes: [],
      });
    }
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.nombre || !formData.precioVenta) {
      toast.error('Complete los campos requeridos');
      return;
    }

    try {
      const platoData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precioVenta: parseFloat(formData.precioVenta),
        categoria: formData.categoria,
        activo: formData.activo,
        ingredientes: formData.ingredientes,
      };

      if (editingPlato) {
        await updatePlato(editingPlato.id, platoData);
        toast.success('Plato actualizado correctamente');
      } else {
        await createPlato(platoData);
        toast.success('Plato creado correctamente');
      }

      await loadData();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving plato:', error);
      toast.error('Error al guardar el plato');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Está seguro de eliminar este plato?')) return;
    
    try {
      await deletePlato(id);
      toast.success('Plato eliminado correctamente');
      await loadData();
    } catch (error) {
      console.error('Error deleting plato:', error);
      toast.error('Error al eliminar el plato');
    }
  }

  function addIngrediente() {
    if (ingredientes.length === 0) {
      toast.error('No hay ingredientes disponibles');
      return;
    }
    
    setFormData({
      ...formData,
      ingredientes: [
        ...formData.ingredientes,
        { ingredienteId: ingredientes[0].id, cantidad: 0 },
      ],
    });
  }

  function updateIngrediente(index: number, field: 'ingredienteId' | 'cantidad', value: string | number) {
    const updated = [...formData.ingredientes];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, ingredientes: updated });
  }

  function removeIngrediente(index: number) {
    setFormData({
      ...formData,
      ingredientes: formData.ingredientes.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto bg-[#0F0F0F]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Gestión de Platos</h2>
          <p className="text-gray-400 text-sm mt-1">Administra el menú de tu restaurante</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] text-[#1B1B1B] hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Plato
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1B1B1B] border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPlato ? 'Editar Plato' : 'Nuevo Plato'}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Complete los datos del plato y sus ingredientes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre *</Label>
                  <Input
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Pasta Alfredo"
                    className="bg-[#2A2A2A] border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Input
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    placeholder="Ej: Pastas"
                    className="bg-[#2A2A2A] border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Descripción del plato"
                  className="bg-[#2A2A2A] border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Precio de Venta ($) *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.precioVenta}
                  onChange={(e) => setFormData({ ...formData, precioVenta: e.target.value })}
                  placeholder="0.00"
                  className="bg-[#2A2A2A] border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Ingredientes</Label>
                  <Button type="button" onClick={addIngrediente} size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar
                  </Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {formData.ingredientes.map((ing, index) => (
                    <div key={index} className="flex gap-2 items-center bg-[#2A2A2A] p-2 rounded-lg">
                      <Select
                        value={ing.ingredienteId}
                        onValueChange={(value) => updateIngrediente(index, 'ingredienteId', value)}
                      >
                        <SelectTrigger className="flex-1 bg-[#1B1B1B] border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1B1B1B] border-gray-700 text-white">
                          {ingredientes.map((ingrediente) => (
                            <SelectItem key={ingrediente.id} value={ingrediente.id}>
                              {ingrediente.nombre} ({ingrediente.unidad})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        step="0.01"
                        value={ing.cantidad}
                        onChange={(e) => updateIngrediente(index, 'cantidad', parseFloat(e.target.value))}
                        placeholder="Cantidad"
                        className="w-32 bg-[#1B1B1B] border-gray-700 text-white"
                      />
                      <Button
                        type="button"
                        onClick={() => removeIngrediente(index)}
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="activo">Plato activo</Label>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-gray-700 text-white hover:bg-gray-800">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] text-[#1B1B1B] hover:opacity-90">
                  {editingPlato ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Lista de Platos</CardTitle>
          <CardDescription className="text-gray-400">
            {platos.length} platos en total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Nombre</TableHead>
                <TableHead className="text-gray-400">Categoría</TableHead>
                <TableHead className="text-gray-400 text-right">Costo</TableHead>
                <TableHead className="text-gray-400 text-right">Precio Venta</TableHead>
                <TableHead className="text-gray-400 text-right">Margen</TableHead>
                <TableHead className="text-gray-400 text-center">Estado</TableHead>
                <TableHead className="text-gray-400 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platos.map((plato) => {
                const costo = calcularCostoPlato(plato, ingredientes);
                const margen = calcularMargen(plato, ingredientes);
                
                return (
                  <TableRow key={plato.id} className="border-gray-800 hover:bg-[#2A2A2A]/50">
                    <TableCell className="text-white">
                      <div>
                        <div>{plato.nombre}</div>
                        {plato.descripcion && (
                          <div className="text-xs text-gray-400 mt-1">{plato.descripcion}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{plato.categoria || '-'}</TableCell>
                    <TableCell className="text-right text-gray-300">${costo.toFixed(2)}</TableCell>
                    <TableCell className="text-right text-gray-300">${plato.precioVenta.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {margen >= 65 ? (
                          <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-orange-400" />
                        )}
                        <span className={margen >= 65 ? 'text-[#2ECC71]' : 'text-orange-400'}>
                          {margen.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        plato.activo 
                          ? 'bg-[#2ECC71]/20 text-[#2ECC71]' 
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {plato.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => handleOpenDialog(plato)}
                          size="icon"
                          variant="ghost"
                          className="text-[#F5B041] hover:text-[#F5B041] hover:bg-[#F5B041]/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(plato.id)}
                          size="icon"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
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
