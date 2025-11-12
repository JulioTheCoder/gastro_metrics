# 🍽️ GastroMetrics - Plataforma SaaS de Análisis Gastronómico

Plataforma completa de análisis de rentabilidad para restaurantes que permite gestionar platos, ingredientes, costos y ventas con métricas en tiempo real.

## 🚀 Características

### Dashboard Principal
- **KPIs en tiempo real**: Ganancia total, margen promedio, platos activos, ahorro potencial
- **Gráficos interactivos**: 
  - Evolución de costos vs ventas (últimos 6 meses)
  - Tendencias de precios de ingredientes (4 semanas)
  - Top 5 platos menos rentables
- **Cálculo automático**: Costos y márgenes calculados dinámicamente

### Gestión de Platos
- ✅ Crear, editar y eliminar platos
- ✅ Asignar ingredientes con cantidades específicas
- ✅ Categorización de platos
- ✅ Activar/desactivar platos del menú
- ✅ Cálculo automático de costos y márgenes
- ✅ Indicadores visuales de rentabilidad

### Gestión de Costos (Ingredientes)
- ✅ Administrar ingredientes con unidades (kg, litro, unidad)
- ✅ Control de stock en tiempo real
- ✅ Actualización de precios
- ✅ Cálculo de inversión en inventario
- ✅ Alertas de stock bajo

### Reportes de Ventas
- ✅ Registro de ventas por plato
- ✅ Historial completo de transacciones
- ✅ Top platos más vendidos
- ✅ Análisis de ticket promedio
- ✅ Ventas del día vs totales

### Configuración
- ✅ Información del sistema
- ✅ Exportación de datos (backup JSON)
- ✅ Reinicio de datos con seed inicial
- ✅ Documentación de API integrada

## 📊 API Endpoints

### Platos
```typescript
// Listar todos los platos con márgenes calculados
GET /platos
Response: Plato[]

// Ver detalle de un plato
GET /platos/:id
Response: Plato

// Registrar nuevo plato
POST /platos
Body: {
  nombre: string,
  descripcion: string,
  precioVenta: number,
  categoria: string,
  activo: boolean,
  ingredientes: Array<{
    ingredienteId: string,
    cantidad: number
  }>
}

// Editar plato
PUT /platos/:id
Body: Partial<Plato>

// Eliminar plato
DELETE /platos/:id
```

### Ingredientes
```typescript
// Listar ingredientes
GET /ingredientes
Response: Ingrediente[]

// Crear ingrediente
POST /ingredientes
Body: {
  nombre: string,
  unidad: 'kg' | 'litro' | 'unidad',
  costoUnitario: number,
  stock: number
}

// Actualizar ingrediente
PUT /ingredientes/:id
Body: Partial<Ingrediente>
```

### Ventas
```typescript
// Registrar venta
POST /ventas
Body: {
  platoId: string,
  cantidad: number,
  fecha: string (ISO),
  total: number
}

// Listar ventas
GET /ventas
Response: Venta[]
```

### Dashboard KPIs
```typescript
// Obtener métricas del dashboard
GET /dashboard/kpis
Response: {
  gananciaTotal: number,
  gananciaPromedio: number,
  margenPromedio: number,
  platosActivos: number,
  platosRentables: number,
  platosRevisar: number,
  ahorroPotencial: number,
  topPlatosMenosRentables: Array<{
    nombre: string,
    costo: number,
    venta: number,
    margen: number,
    trend: 'up' | 'down'
  }>,
  evolucionCostos: Array<{
    mes: string,
    ganancia: number,
    costos: number
  }>,
  evolucionIngredientes: Array<{
    semana: string,
    [ingrediente: string]: number
  }>
}
```

## 🗃️ Estructura de Datos

### Plato
```typescript
interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  ingredientes: Array<{
    ingredienteId: string;
    cantidad: number;
  }>;
  categoria: string;
  activo: boolean;
  fechaCreacion: string;
}
```

### Ingrediente
```typescript
interface Ingrediente {
  id: string;
  nombre: string;
  unidad: 'kg' | 'litro' | 'unidad';
  costoUnitario: number;
  stock: number;
  fechaActualizacion: string;
}
```

### Venta
```typescript
interface Venta {
  id: string;
  platoId: string;
  cantidad: number;
  fecha: string;
  total: number;
}
```

## 📦 Datos de Prueba (Seed)

El sistema incluye datos iniciales:
- **10 ingredientes**: Salmón, Pollo, Res, Pasta, Crema, Queso, Vegetales, Aceite, Arroz, Hongos
- **5 platos**: Pasta Alfredo, Salmón a la Parrilla, Risotto de Hongos, Pollo a las Hierbas, Pasta Carbonara
- **Ventas simuladas**: 6 meses de historial para análisis

## 🎨 Tecnologías

- **Frontend**: React + TypeScript + Vite
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Notificaciones**: Sonner
- **Almacenamiento**: LocalStorage (simulación de backend)

## 🔧 Funcionalidades Técnicas

### Cálculos Automáticos
```typescript
// Costo total del plato
costoPlato = Σ(ingrediente.costoUnitario × cantidad)

// Margen de ganancia
margen = ((precioVenta - costoPlato) / precioVenta) × 100

// Ganancia por venta
ganancia = (precioVenta - costoPlato) × cantidad
```

### Sistema de Colores por Rentabilidad
- 🟢 Verde (#2ECC71): Margen ≥ 68% (Óptimo)
- 🟡 Amarillo (#F5B041): Margen 65-67% (Aceptable)
- 🟠 Naranja: Margen < 65% (Revisar)

## 📱 Responsive Design

La aplicación está optimizada para:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

## 🔐 Seguridad y Privacidad

**Nota importante**: Esta aplicación usa LocalStorage para demostración. No almacena información personal identificable (PII) ni datos sensibles en producción.

Para uso en producción, se recomienda:
- Implementar autenticación JWT
- Usar base de datos segura (PostgreSQL, MongoDB)
- Implementar HTTPS
- Añadir validación de datos en backend
- Implementar rate limiting

## 🚦 Estado del Proyecto

- ✅ Dashboard con KPIs en tiempo real
- ✅ CRUD completo de Platos
- ✅ CRUD completo de Ingredientes
- ✅ Registro y análisis de Ventas
- ✅ Cálculos automáticos de costos y márgenes
- ✅ Gráficos interactivos con Recharts
- ✅ Exportación de datos
- ✅ Sistema de notificaciones
- ✅ Responsive design completo

## 📝 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Multi-restaurante
- [ ] Exportación a PDF de reportes
- [ ] Predicción de demanda con ML
- [ ] Integración con POS
- [ ] App móvil nativa
- [ ] Alertas automáticas por email
- [ ] Gestión de proveedores

## 📄 Licencia

Este proyecto es una demostración educativa de GastroMetrics.

---

**Desarrollado con ❤️ para optimizar la rentabilidad de restaurantes**
