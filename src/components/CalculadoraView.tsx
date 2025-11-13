import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getPlatos, getIngredientes, type Plato, type Ingrediente, type PlatoIngrediente, calcularCostoPlato } from "../lib/api";

export function CalculadoraView() {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [selectedPlatoId, setSelectedPlatoId] = useState<string>("");
  const [porciones, setPorciones] = useState<number>(1);

  useEffect(() => {
    async function load() {
      const [p, ing] = await Promise.all([getPlatos(), getIngredientes()]);
      setPlatos(p);
      setIngredientes(ing);
      if (p.length > 0) setSelectedPlatoId(p[0].id);
    }
    load();
  }, []);

  const selectedPlato = platos.find((p) => p.id === selectedPlatoId);

  function calcularIngredientes(): Array<{ nombre: string; cantidad: number; unidad: string }> {
    if (!selectedPlato) return [];

    return selectedPlato.ingredientes.map((pi) => {
      const ing = ingredientes.find((i) => i.id === pi.ingredienteId);
      const cantidadBase = typeof pi.cantidad === 'number' ? pi.cantidad : parseFloat(String(pi.cantidad)) || 0;
      return {
        nombre: ing ? ing.nombre : 'Ingrediente desconocido',
        cantidad: Math.round((cantidadBase * porciones) * 100) / 100,
        unidad: ing ? ing.unidad : '',
      };
    });
  }

  const resultado = calcularIngredientes();

  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto bg-[#0F0F0F]">
      <div>
        <h2 className="text-white">Calculadora de Porciones</h2>
        <p className="text-gray-400 text-sm mt-1">Ajusta las cantidades de ingredientes según las porciones deseadas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Seleccionar Plato</CardTitle>
              <CardDescription className="text-gray-400">Elige un plato y la cantidad de porciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Plato</label>
                <select
                  value={selectedPlatoId}
                  onChange={(e) => setSelectedPlatoId(e.target.value)}
                  className="w-full bg-[#2A2A2A] border border-gray-700 text-white p-2 rounded"
                >
                  {platos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Porciones</label>
                <Input type="number" min={1} value={porciones} onChange={(e) => setPorciones(Number(e.target.value || 1))} className="bg-[#2A2A2A] border-gray-700 text-white" />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => navigator.clipboard?.writeText(JSON.stringify(resultado, null, 2))} className="bg-gradient-to-r from-[#F5B041] to-[#2ECC71] text-[#1B1B1B]">Copiar Resultado</Button>
                <Button onClick={() => setPorciones(1)} variant="outline" className="border-gray-700 text-white">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Resumen</CardTitle>
              <CardDescription className="text-gray-400">Costo aproximado y detalles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 text-white text-2xl">
                ${selectedPlato ? calcularCostoPlato(selectedPlato, ingredientes).toFixed(2) : '0.00'}
              </div>
              <div className="text-sm text-gray-400">Costo base del plato (por porción)</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-[#1B1B1B] border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Ingredientes necesarios</CardTitle>
          <CardDescription className="text-gray-400">Cantidades ajustadas para {porciones} porción(es)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Ingrediente</TableHead>
                <TableHead className="text-gray-400 text-right">Cantidad</TableHead>
                <TableHead className="text-gray-400 text-right">Unidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultado.map((r, i) => (
                <TableRow key={i} className="border-gray-800 hover:bg-[#2A2A2A]/50">
                  <TableCell className="text-white">{r.nombre}</TableCell>
                  <TableCell className="text-right text-gray-300">{r.cantidad}</TableCell>
                  <TableCell className="text-right text-gray-300">{r.unidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
