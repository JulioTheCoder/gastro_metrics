# 📡 GastroMetrics API Documentation

Documentación completa de la API de GastroMetrics para análisis gastronómico.

**Base URL**: `/api` (implementación futura con backend)  
**Versión**: 1.0.0  
**Formato**: JSON  
**Autenticación**: No requerida (endpoints abiertos según especificación)

---

## 📑 Índice

- [Platos](#platos)
- [Ingredientes](#ingredientes)
- [Ventas](#ventas)
- [Dashboard / KPIs](#dashboard--kpis)
- [Modelos de Datos](#modelos-de-datos)
- [Códigos de Error](#códigos-de-error)

---

## 🍽️ Platos

### GET /platos
Lista todos los platos con márgenes calculados.

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "nombre": "Pasta Alfredo",
      "descripcion": "Pasta fresca con salsa cremosa de queso parmesano",
      "precioVenta": 12.00,
      "categoria": "Pastas",
      "activo": true,
      "ingredientes": [
        {
          "ingredienteId": "4",
          "cantidad": 0.25
        }
      ],
      "fechaCreacion": "2025-10-01T10:30:00.000Z",
      "costoCalculado": 4.50,
      "margenCalculado": 62.5
    }
  ],
  "count": 42
}
```

**Query Parameters**
- `activo` (boolean): Filtrar por estado activo/inactivo
- `categoria` (string): Filtrar por categoría
- `limit` (number): Límite de resultados (default: 100)
- `offset` (number): Offset para paginación (default: 0)

**Ejemplo**
```bash
GET /platos?activo=true&categoria=Pastas&limit=10
```

---

### GET /platos/:id
Obtiene el detalle de un plato específico.

**Parameters**
- `id` (string, required): ID del plato

**Response**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "nombre": "Pasta Alfredo",
    "descripcion": "Pasta fresca con salsa cremosa de queso parmesano",
    "precioVenta": 12.00,
    "categoria": "Pastas",
    "activo": true,
    "ingredientes": [
      {
        "ingredienteId": "4",
        "cantidad": 0.25,
        "ingrediente": {
          "id": "4",
          "nombre": "Pasta Fresca",
          "unidad": "kg",
          "costoUnitario": 3.20
        }
      }
    ],
    "fechaCreacion": "2025-10-01T10:30:00.000Z",
    "costoTotal": 4.50,
    "margen": 62.5,
    "ventasTotales": 156,
    "ingresoTotal": 1872.00
  }
}
```

---

### POST /platos
Crea un nuevo plato.

**Request Body**
```json
{
  "nombre": "Risotto de Hongos",
  "descripcion": "Arroz cremoso con hongos frescos y parmesano",
  "precioVenta": 16.00,
  "categoria": "Arroces",
  "activo": true,
  "ingredientes": [
    {
      "ingredienteId": "9",
      "cantidad": 0.15
    },
    {
      "ingredienteId": "10",
      "cantidad": 0.12
    }
  ]
}
```

**Validaciones**
- `nombre`: requerido, 3-100 caracteres
- `precioVenta`: requerido, > 0
- `ingredientes`: array, puede estar vacío
- `categoria`: opcional, máx 50 caracteres

**Response**
```json
{
  "success": true,
  "message": "Plato creado correctamente",
  "data": {
    "id": "42",
    "nombre": "Risotto de Hongos",
    "descripcion": "Arroz cremoso con hongos frescos y parmesano",
    "precioVenta": 16.00,
    "categoria": "Arroces",
    "activo": true,
    "ingredientes": [...],
    "fechaCreacion": "2025-10-29T15:45:00.000Z"
  }
}
```

**Errores Posibles**
- `400`: Datos inválidos
- `409`: Plato con el mismo nombre ya existe

---

### PUT /platos/:id
Actualiza un plato existente.

**Parameters**
- `id` (string, required): ID del plato

**Request Body** (campos opcionales)
```json
{
  "nombre": "Risotto de Hongos Premium",
  "precioVenta": 18.00,
  "activo": false,
  "ingredientes": [
    {
      "ingredienteId": "9",
      "cantidad": 0.20
    }
  ]
}
```

**Response**
```json
{
  "success": true,
  "message": "Plato actualizado correctamente",
  "data": {
    "id": "42",
    "nombre": "Risotto de Hongos Premium",
    "precioVenta": 18.00,
    ...
  }
}
```

**Errores Posibles**
- `404`: Plato no encontrado
- `400`: Datos inválidos

---

### DELETE /platos/:id
Elimina un plato.

**Parameters**
- `id` (string, required): ID del plato

**Response**
```json
{
  "success": true,
  "message": "Plato eliminado correctamente"
}
```

**Errores Posibles**
- `404`: Plato no encontrado
- `409`: No se puede eliminar, tiene ventas asociadas

---

## 🥬 Ingredientes

### GET /ingredientes
Lista todos los ingredientes.

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "nombre": "Salmón Fresco",
      "unidad": "kg",
      "costoUnitario": 24.00,
      "stock": 50,
      "fechaActualizacion": "2025-10-28T08:00:00.000Z"
    }
  ],
  "count": 10
}
```

---

### GET /ingredientes/:id
Obtiene detalle de un ingrediente.

**Response**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "nombre": "Salmón Fresco",
    "unidad": "kg",
    "costoUnitario": 24.00,
    "stock": 50,
    "fechaActualizacion": "2025-10-28T08:00:00.000Z",
    "valorStock": 1200.00,
    "platosQueLoUsan": [
      {
        "platoId": "2",
        "platoNombre": "Salmón a la Parrilla",
        "cantidadPorPlato": 0.3
      }
    ]
  }
}
```

---

### POST /ingredientes
Crea un nuevo ingrediente.

**Request Body**
```json
{
  "nombre": "Trucha Fresca",
  "unidad": "kg",
  "costoUnitario": 18.50,
  "stock": 30
}
```

**Validaciones**
- `nombre`: requerido, 3-100 caracteres
- `unidad`: requerido, enum: 'kg', 'litro', 'unidad'
- `costoUnitario`: requerido, > 0
- `stock`: opcional, >= 0

**Response**
```json
{
  "success": true,
  "message": "Ingrediente creado correctamente",
  "data": {
    "id": "11",
    "nombre": "Trucha Fresca",
    "unidad": "kg",
    "costoUnitario": 18.50,
    "stock": 30,
    "fechaActualizacion": "2025-10-29T16:00:00.000Z"
  }
}
```

---

### PUT /ingredientes/:id
Actualiza un ingrediente.

**Request Body**
```json
{
  "costoUnitario": 19.00,
  "stock": 45
}
```

**Response**
```json
{
  "success": true,
  "message": "Ingrediente actualizado correctamente",
  "data": {
    "id": "11",
    "nombre": "Trucha Fresca",
    "costoUnitario": 19.00,
    "stock": 45,
    "fechaActualizacion": "2025-10-29T17:30:00.000Z"
  }
}
```

---

### DELETE /ingredientes/:id
Elimina un ingrediente.

**Response**
```json
{
  "success": true,
  "message": "Ingrediente eliminado correctamente"
}
```

**Errores Posibles**
- `409`: No se puede eliminar, está siendo usado en platos

---

## 🛒 Ventas

### POST /ventas
Registra una nueva venta.

**Request Body**
```json
{
  "platoId": "2",
  "cantidad": 2,
  "fecha": "2025-10-29T19:30:00.000Z"
}
```

**Validaciones**
- `platoId`: requerido, debe existir
- `cantidad`: requerido, > 0
- `fecha`: opcional, default: ahora

**Response**
```json
{
  "success": true,
  "message": "Venta registrada correctamente",
  "data": {
    "id": "1234",
    "platoId": "2",
    "cantidad": 2,
    "fecha": "2025-10-29T19:30:00.000Z",
    "total": 44.00,
    "plato": {
      "nombre": "Salmón a la Parrilla",
      "precioVenta": 22.00
    }
  }
}
```

---

### GET /ventas
Lista todas las ventas.

**Query Parameters**
- `platoId` (string): Filtrar por plato
- `fechaInicio` (ISO date): Fecha inicial
- `fechaFin` (ISO date): Fecha final
- `limit` (number): Límite de resultados
- `offset` (number): Offset para paginación

**Ejemplo**
```bash
GET /ventas?fechaInicio=2025-10-01&fechaFin=2025-10-31&limit=50
```

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": "1234",
      "platoId": "2",
      "cantidad": 2,
      "fecha": "2025-10-29T19:30:00.000Z",
      "total": 44.00,
      "plato": {
        "nombre": "Salmón a la Parrilla"
      }
    }
  ],
  "count": 156,
  "totalIngresos": 6848.00
}
```

---

### GET /ventas/plato/:platoId
Obtiene ventas de un plato específico.

**Response**
```json
{
  "success": true,
  "data": {
    "platoId": "2",
    "platoNombre": "Salmón a la Parrilla",
    "ventas": [...],
    "totalVentas": 156,
    "totalUnidades": 203,
    "ingresoTotal": 4466.00,
    "ventasHoy": 5,
    "ventasMes": 42
  }
}
```

---

## 📊 Dashboard / KPIs

### GET /dashboard/kpis
Obtiene todas las métricas del dashboard.

**Query Parameters**
- `periodo` (string): 'dia', 'semana', 'mes', 'año' (default: 'mes')

**Response**
```json
{
  "success": true,
  "data": {
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
        "costo": 4.50,
        "venta": 12.00,
        "margen": 62.5,
        "trend": "down"
      }
    ],
    "evolucionCostos": [
      {
        "mes": "Ene",
        "ganancia": 8500,
        "costos": 5200
      }
    ],
    "evolucionIngredientes": [
      {
        "semana": "S1",
        "salmonfresco": 240,
        "pollo": 85,
        "respremium": 180,
        "vegetalesmix": 40
      }
    ]
  },
  "generatedAt": "2025-10-29T20:00:00.000Z"
}
```

---

### GET /dashboard/platos-rentables
Lista platos ordenados por rentabilidad.

**Response**
```json
{
  "success": true,
  "data": {
    "masRentables": [
      {
        "plato": "Salmón a la Parrilla",
        "margen": 67.3,
        "gananciaPromedio": 14.80,
        "ventas": 156
      }
    ],
    "menosRentables": [...]
  }
}
```

---

### GET /dashboard/tendencias
Obtiene tendencias de ventas y costos.

**Response**
```json
{
  "success": true,
  "data": {
    "ventasPorDia": [...],
    "costosPorSemana": [...],
    "platosEnAuge": [...],
    "platosEnDecadencia": [...]
  }
}
```

---

## 📋 Modelos de Datos

### Plato
```typescript
{
  id: string;
  nombre: string;
  descripcion: string;
  precioVenta: number;
  categoria: string;
  activo: boolean;
  ingredientes: Array<{
    ingredienteId: string;
    cantidad: number;
  }>;
  fechaCreacion: string; // ISO 8601
}
```

### Ingrediente
```typescript
{
  id: string;
  nombre: string;
  unidad: 'kg' | 'litro' | 'unidad';
  costoUnitario: number;
  stock: number;
  fechaActualizacion: string; // ISO 8601
}
```

### Venta
```typescript
{
  id: string;
  platoId: string;
  cantidad: number;
  fecha: string; // ISO 8601
  total: number;
}
```

---

## ⚠️ Códigos de Error

### 400 Bad Request
Datos de entrada inválidos.
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "El precio de venta debe ser mayor a 0",
    "field": "precioVenta"
  }
}
```

### 404 Not Found
Recurso no encontrado.
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Plato con id '123' no encontrado"
  }
}
```

### 409 Conflict
Conflicto con el estado actual.
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "No se puede eliminar el ingrediente porque está siendo usado en 3 platos"
  }
}
```

### 500 Internal Server Error
Error del servidor.
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Error interno del servidor"
  }
}
```

---

## 📝 Notas de Implementación

### Cálculos Automáticos

**Costo del Plato**
```
costoPlato = Σ (ingrediente.costoUnitario × cantidad)
```

**Margen de Ganancia**
```
margen = ((precioVenta - costoPlato) / precioVenta) × 100
```

**Ganancia por Venta**
```
ganancia = (precioVenta - costoPlato) × cantidad
```

### Límites de Rate

- **Desarrollo**: Sin límites
- **Producción** (recomendado):
  - 100 requests/minuto por IP
  - 1000 requests/hora por IP

### Formato de Fechas

Todas las fechas usan formato ISO 8601:
```
2025-10-29T20:00:00.000Z
```

### Paginación

Parámetros estándar:
- `limit`: Máximo 100 items
- `offset`: Basado en 0

Headers de respuesta:
```
X-Total-Count: 156
X-Page-Limit: 50
X-Page-Offset: 0
```

---

## 🔗 Colección de Postman

Para facilitar el testing, importa la colección de Postman:

**Endpoints Base**:
```
Local: http://localhost:5173/api
Production: https://gastrometrics.com/api
```

**Variables de entorno**:
```json
{
  "base_url": "http://localhost:5173/api",
  "plato_id": "1",
  "ingrediente_id": "1"
}
```

---

**Última actualización**: 29 de octubre de 2025  
**Mantenido por**: Equipo GastroMetrics
