// Mock API usando localStorage para simular backend

export interface Ingrediente {
  id: string;
  nombre: string;
  unidad: 'kg' | 'litro' | 'unidad';
  costoUnitario: number;
  stock: number;
  fechaActualizacion: string;
}

export interface PlatoIngrediente {
  ingredienteId: string;
  cantidad: number;
}

export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  ingredientes: PlatoIngrediente[];
  categoria: string;
  activo: boolean;
  fechaCreacion: string;
}

export interface Venta {
  id: string;
  platoId: string;
  cantidad: number;
  fecha: string;
  total: number;
}

export interface DashboardKPIs {
  gananciaTotal: number;
  gananciaPromedio: number;
  margenPromedio: number;
  platosActivos: number;
  platosRentables: number;
  platosRevisar: number;
  ahorroPotencial: number;
  topPlatosMenosRentables: Array<{
    nombre: string;
    costo: number;
    venta: number;
    margen: number;
    trend: 'up' | 'down';
  }>;
  evolucionCostos: Array<{
    mes: string;
    ganancia: number;
    costos: number;
  }>;
  evolucionIngredientes: Array<{
    semana: string;
    [key: string]: number | string;
  }>;
}

// Storage keys
const KEYS = {
  INGREDIENTES: 'gastrometrics_ingredientes',
  PLATOS: 'gastrometrics_platos',
  VENTAS: 'gastrometrics_ventas',
  INITIALIZED: 'gastrometrics_initialized',
};

// Helper functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Seed data
function initializeSeedData(): void {
  if (getFromStorage(KEYS.INITIALIZED, false)) return;

  const ingredientes: Ingrediente[] = [
    { id: '1', nombre: 'Salmón Fresco', unidad: 'kg', costoUnitario: 24.0, stock: 50, fechaActualizacion: new Date().toISOString() },
    { id: '2', nombre: 'Pollo', unidad: 'kg', costoUnitario: 8.5, stock: 100, fechaActualizacion: new Date().toISOString() },
    { id: '3', nombre: 'Res Premium', unidad: 'kg', costoUnitario: 18.0, stock: 60, fechaActualizacion: new Date().toISOString() },
    { id: '4', nombre: 'Pasta Fresca', unidad: 'kg', costoUnitario: 3.2, stock: 80, fechaActualizacion: new Date().toISOString() },
    { id: '5', nombre: 'Crema', unidad: 'litro', costoUnitario: 5.5, stock: 40, fechaActualizacion: new Date().toISOString() },
    { id: '6', nombre: 'Queso Parmesano', unidad: 'kg', costoUnitario: 15.0, stock: 30, fechaActualizacion: new Date().toISOString() },
    { id: '7', nombre: 'Vegetales Mix', unidad: 'kg', costoUnitario: 4.0, stock: 120, fechaActualizacion: new Date().toISOString() },
    { id: '8', nombre: 'Aceite de Oliva', unidad: 'litro', costoUnitario: 12.0, stock: 25, fechaActualizacion: new Date().toISOString() },
    { id: '9', nombre: 'Arroz Arborio', unidad: 'kg', costoUnitario: 6.0, stock: 70, fechaActualizacion: new Date().toISOString() },
    { id: '10', nombre: 'Hongos Frescos', unidad: 'kg', costoUnitario: 9.0, stock: 45, fechaActualizacion: new Date().toISOString() },
  ];

  const platos: Plato[] = [
    {
      id: '1',
      nombre: 'Pasta Alfredo',
      descripcion: 'Pasta fresca con salsa cremosa de queso parmesano',
      precioVenta: 12.0,
      categoria: 'Pastas',
      activo: true,
      fechaCreacion: new Date().toISOString(),
      ingredientes: [
        { ingredienteId: '4', cantidad: 0.25 },
        { ingredienteId: '5', cantidad: 0.15 },
        { ingredienteId: '6', cantidad: 0.05 },
      ],
    },
    {
      id: '2',
      nombre: 'Salmón a la Parrilla',
      descripcion: 'Filete de salmón fresco con vegetales asados',
      precioVenta: 22.0,
      categoria: 'Pescados',
      activo: true,
      fechaCreacion: new Date().toISOString(),
      ingredientes: [
        { ingredienteId: '1', cantidad: 0.3 },
        { ingredienteId: '7', cantidad: 0.2 },
        { ingredienteId: '8', cantidad: 0.02 },
      ],
    },
    {
      id: '3',
      nombre: 'Risotto de Hongos',
      descripcion: 'Arroz cremoso con hongos frescos y parmesano',
      precioVenta: 16.0,
      categoria: 'Arroces',
      activo: true,
      fechaCreacion: new Date().toISOString(),
      ingredientes: [
        { ingredienteId: '9', cantidad: 0.15 },
        { ingredienteId: '10', cantidad: 0.12 },
        { ingredienteId: '6', cantidad: 0.04 },
        { ingredienteId: '5', cantidad: 0.1 },
      ],
    },
    {
      id: '4',
      nombre: 'Pollo a las Hierbas',
      descripcion: 'Pechuga de pollo con especias y vegetales',
      precioVenta: 14.0,
      categoria: 'Carnes',
      activo: true,
      fechaCreacion: new Date().toISOString(),
      ingredientes: [
        { ingredienteId: '2', cantidad: 0.25 },
        { ingredienteId: '7', cantidad: 0.15 },
        { ingredienteId: '8', cantidad: 0.02 },
      ],
    },
    {
      id: '5',
      nombre: 'Pasta Carbonara',
      descripcion: 'Pasta con salsa carbonara tradicional',
      precioVenta: 13.5,
      categoria: 'Pastas',
      activo: true,
      fechaCreacion: new Date().toISOString(),
      ingredientes: [
        { ingredienteId: '4', cantidad: 0.25 },
        { ingredienteId: '6', cantidad: 0.05 },
        { ingredienteId: '5', cantidad: 0.1 },
      ],
    },
  ];

  // Generar ventas de ejemplo para los últimos 6 meses
  const ventas: Venta[] = [];
  let ventaId = 1;
  
  for (let mes = 5; mes >= 0; mes--) {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - mes);
    
    platos.forEach((plato) => {
      const numVentas = Math.floor(Math.random() * 15) + 10;
      for (let i = 0; i < numVentas; i++) {
        const ventaFecha = new Date(fecha);
        ventaFecha.setDate(Math.floor(Math.random() * 28) + 1);
        
        ventas.push({
          id: String(ventaId++),
          platoId: plato.id,
          cantidad: Math.floor(Math.random() * 3) + 1,
          fecha: ventaFecha.toISOString(),
          total: plato.precioVenta * (Math.floor(Math.random() * 3) + 1),
        });
      }
    });
  }

  saveToStorage(KEYS.INGREDIENTES, ingredientes);
  saveToStorage(KEYS.PLATOS, platos);
  saveToStorage(KEYS.VENTAS, ventas);
  saveToStorage(KEYS.INITIALIZED, true);
}

// Calcular costo total de un plato
export function calcularCostoPlato(plato: Plato, ingredientes: Ingrediente[]): number {
  return plato.ingredientes.reduce((total, pi) => {
    const ingrediente = ingredientes.find((i) => i.id === pi.ingredienteId);
    return total + (ingrediente ? ingrediente.costoUnitario * pi.cantidad : 0);
  }, 0);
}

// Calcular margen de un plato
export function calcularMargen(plato: Plato, ingredientes: Ingrediente[]): number {
  const costo = calcularCostoPlato(plato, ingredientes);
  return ((plato.precioVenta - costo) / plato.precioVenta) * 100;
}

// API Methods

// Ingredientes
export async function getIngredientes(): Promise<Ingrediente[]> {
  initializeSeedData();
  return getFromStorage(KEYS.INGREDIENTES, []);
}

export async function getIngrediente(id: string): Promise<Ingrediente | null> {
  const ingredientes = await getIngredientes();
  return ingredientes.find((i) => i.id === id) || null;
}

export async function createIngrediente(ingrediente: Omit<Ingrediente, 'id' | 'fechaActualizacion'>): Promise<Ingrediente> {
  const ingredientes = await getIngredientes();
  const newIngrediente: Ingrediente = {
    ...ingrediente,
    id: String(Date.now()),
    fechaActualizacion: new Date().toISOString(),
  };
  ingredientes.push(newIngrediente);
  saveToStorage(KEYS.INGREDIENTES, ingredientes);
  return newIngrediente;
}

export async function updateIngrediente(id: string, data: Partial<Ingrediente>): Promise<Ingrediente | null> {
  const ingredientes = await getIngredientes();
  const index = ingredientes.findIndex((i) => i.id === id);
  if (index === -1) return null;
  
  ingredientes[index] = {
    ...ingredientes[index],
    ...data,
    id,
    fechaActualizacion: new Date().toISOString(),
  };
  saveToStorage(KEYS.INGREDIENTES, ingredientes);
  return ingredientes[index];
}

export async function deleteIngrediente(id: string): Promise<boolean> {
  const ingredientes = await getIngredientes();
  const filtered = ingredientes.filter((i) => i.id !== id);
  if (filtered.length === ingredientes.length) return false;
  saveToStorage(KEYS.INGREDIENTES, filtered);
  return true;
}

// Platos
export async function getPlatos(): Promise<Plato[]> {
  initializeSeedData();
  return getFromStorage(KEYS.PLATOS, []);
}

export async function getPlato(id: string): Promise<Plato | null> {
  const platos = await getPlatos();
  return platos.find((p) => p.id === id) || null;
}

export async function createPlato(plato: Omit<Plato, 'id' | 'fechaCreacion'>): Promise<Plato> {
  const platos = await getPlatos();
  const newPlato: Plato = {
    ...plato,
    id: String(Date.now()),
    fechaCreacion: new Date().toISOString(),
  };
  platos.push(newPlato);
  saveToStorage(KEYS.PLATOS, platos);
  return newPlato;
}

export async function updatePlato(id: string, data: Partial<Plato>): Promise<Plato | null> {
  const platos = await getPlatos();
  const index = platos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  platos[index] = { ...platos[index], ...data, id };
  saveToStorage(KEYS.PLATOS, platos);
  return platos[index];
}

export async function deletePlato(id: string): Promise<boolean> {
  const platos = await getPlatos();
  const filtered = platos.filter((p) => p.id !== id);
  if (filtered.length === platos.length) return false;
  saveToStorage(KEYS.PLATOS, filtered);
  return true;
}

// Ventas
export async function getVentas(): Promise<Venta[]> {
  initializeSeedData();
  return getFromStorage(KEYS.VENTAS, []);
}

export async function createVenta(venta: Omit<Venta, 'id'>): Promise<Venta> {
  const ventas = await getVentas();
  const newVenta: Venta = {
    ...venta,
    id: String(Date.now()),
  };
  ventas.push(newVenta);
  saveToStorage(KEYS.VENTAS, ventas);
  return newVenta;
}

export async function getVentasByPlato(platoId: string): Promise<Venta[]> {
  const ventas = await getVentas();
  return ventas.filter((v) => v.platoId === platoId);
}

// Dashboard KPIs
export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  const platos = await getPlatos();
  const ingredientes = await getIngredientes();
  const ventas = await getVentas();

  // Calcular ganancia total del mes actual
  const now = new Date();
  const mesActual = now.getMonth();
  const añoActual = now.getFullYear();
  
  const ventasMesActual = ventas.filter((v) => {
    const ventaFecha = new Date(v.fecha);
    return ventaFecha.getMonth() === mesActual && ventaFecha.getFullYear() === añoActual;
  });

  let gananciaTotal = 0;
  let costoTotal = 0;

  ventasMesActual.forEach((venta) => {
    const plato = platos.find((p) => p.id === venta.platoId);
    if (plato) {
      const costo = calcularCostoPlato(plato, ingredientes);
      gananciaTotal += (plato.precioVenta - costo) * venta.cantidad;
      costoTotal += costo * venta.cantidad;
    }
  });

  // Calcular margen promedio
  const margenes = platos.map((p) => calcularMargen(p, ingredientes));
  const margenPromedio = margenes.reduce((a, b) => a + b, 0) / margenes.length;

  // Top 5 platos menos rentables
  const platosConMargen = platos
    .map((plato) => {
      const costo = calcularCostoPlato(plato, ingredientes);
      const margen = calcularMargen(plato, ingredientes);
      
      // Calcular trend basado en ventas
      const ventasPlato = ventas.filter((v) => v.platoId === plato.id);
      const ventasRecientes = ventasPlato.filter((v) => {
        const diff = now.getTime() - new Date(v.fecha).getTime();
        return diff < 30 * 24 * 60 * 60 * 1000; // últimos 30 días
      });
      const ventasAntiguas = ventasPlato.filter((v) => {
        const diff = now.getTime() - new Date(v.fecha).getTime();
        return diff >= 30 * 24 * 60 * 60 * 1000 && diff < 60 * 24 * 60 * 60 * 1000;
      });
      
      const trend = ventasRecientes.length > ventasAntiguas.length ? 'up' : 'down';

      return {
        nombre: plato.nombre,
        costo,
        venta: plato.precioVenta,
        margen,
        trend: trend as 'up' | 'down',
      };
    })
    .sort((a, b) => a.margen - b.margen)
    .slice(0, 5);

  // Evolución de costos (últimos 6 meses)
  const evolucionCostos = [];
  for (let i = 5; i >= 0; i--) {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - i);
    const mes = fecha.toLocaleDateString('es-ES', { month: 'short' });
    
    const ventasMes = ventas.filter((v) => {
      const ventaFecha = new Date(v.fecha);
      return ventaFecha.getMonth() === fecha.getMonth() && ventaFecha.getFullYear() === fecha.getFullYear();
    });

    let gananciaMes = 0;
    let costoMes = 0;

    ventasMes.forEach((venta) => {
      const plato = platos.find((p) => p.id === venta.platoId);
      if (plato) {
        const costo = calcularCostoPlato(plato, ingredientes);
        gananciaMes += (plato.precioVenta - costo) * venta.cantidad;
        costoMes += costo * venta.cantidad;
      }
    });

    evolucionCostos.push({
      mes: mes.charAt(0).toUpperCase() + mes.slice(1),
      ganancia: Math.round(gananciaMes),
      costos: Math.round(costoMes),
    });
  }

  // Evolución ingredientes (últimas 4 semanas)
  const evolucionIngredientes = [];
  const topIngredientes = ingredientes.slice(0, 4);
  
  for (let i = 3; i >= 0; i--) {
    const semana: any = { semana: `S${4 - i}` };
    topIngredientes.forEach((ing) => {
      // Simular variación de precio
      const variacion = (Math.random() - 0.5) * 0.2;
      semana[ing.nombre.toLowerCase().replace(/\s+/g, '')] = Math.round(ing.costoUnitario * 10 * (1 + variacion));
    });
    evolucionIngredientes.push(semana);
  }

  // Platos activos, rentables, a revisar
  const platosActivos = platos.filter((p) => p.activo).length;
  const platosRentables = platos.filter((p) => {
    const margen = calcularMargen(p, ingredientes);
    return margen >= 65 && p.activo;
  }).length;
  const platosRevisar = platosActivos - platosRentables;

  // Ahorro potencial (platos con margen bajo)
  const ahorroPotencial = platos.reduce((total, plato) => {
    const margen = calcularMargen(plato, ingredientes);
    if (margen < 65) {
      const costo = calcularCostoPlato(plato, ingredientes);
      const costoOptimo = plato.precioVenta * 0.35; // Asumiendo 65% de margen
      const ahorro = (costo - costoOptimo) * 20; // Promedio 20 ventas/mes
      return total + Math.max(0, ahorro);
    }
    return total;
  }, 0);

  return {
    gananciaTotal: Math.round(gananciaTotal),
    gananciaPromedio: Math.round(gananciaTotal / platosActivos),
    margenPromedio: Math.round(margenPromedio),
    platosActivos,
    platosRentables,
    platosRevisar,
    ahorroPotencial: Math.round(ahorroPotencial),
    topPlatosMenosRentables: platosConMargen,
    evolucionCostos,
    evolucionIngredientes,
  };
}

// Reset data (útil para testing)
export async function resetData(): Promise<void> {
  localStorage.removeItem(KEYS.INGREDIENTES);
  localStorage.removeItem(KEYS.PLATOS);
  localStorage.removeItem(KEYS.VENTAS);
  localStorage.removeItem(KEYS.INITIALIZED);
  initializeSeedData();
}
