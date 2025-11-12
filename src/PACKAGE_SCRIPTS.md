# 📦 Scripts de NPM para GastroMetrics

Este documento describe los scripts de npm disponibles para el proyecto.

## 🚀 Scripts Principales

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo con Vite en modo watch.
- Puerto por defecto: `5173`
- Hot Module Replacement (HMR) activado
- Source maps para debugging

### Build de Producción
```bash
npm run build
```
Compila la aplicación para producción:
- Minificación de código
- Tree-shaking automático
- Optimización de assets
- Generación de source maps
- Output en carpeta `dist/`

### Preview de Producción
```bash
npm run preview
```
Sirve la versión compilada localmente para testing antes de deployment.

### Linting
```bash
npm run lint
```
Ejecuta ESLint para verificar calidad de código y detectar errores.

## 🗄️ Scripts de Base de Datos

### Seed (Datos Iniciales)
```bash
npm run seed
```
**Descripción**: Reinicia y carga datos de prueba en el sistema.

**Datos incluidos**:
- 10 ingredientes con costos y stock
- 5 platos con recetas completas
- Ventas simuladas de 6 meses

**Uso**:
```bash
# Resetear datos a estado inicial
npm run seed

# Ver confirmación en consola
# ✅ Datos inicializados correctamente
# - 10 ingredientes cargados
# - 5 platos creados
# - ~300 ventas generadas
```

**Implementación** (agregar a package.json):
```json
{
  "scripts": {
    "seed": "node scripts/seed.js"
  }
}
```

### Backup de Datos
```bash
npm run backup
```
Exporta todos los datos a un archivo JSON.

**Implementación**:
```json
{
  "scripts": {
    "backup": "node scripts/backup.js"
  }
}
```

### Restore de Datos
```bash
npm run restore
```
Restaura datos desde un archivo de backup.

**Implementación**:
```json
{
  "scripts": {
    "restore": "node scripts/restore.js"
  }
}
```

## 🧪 Scripts de Testing

### Tests Unitarios
```bash
npm run test
```
Ejecuta suite de tests con Vitest.

### Tests en Modo Watch
```bash
npm run test:watch
```
Ejecuta tests en modo watch para desarrollo.

### Coverage
```bash
npm run test:coverage
```
Genera reporte de cobertura de código.

**Implementación**:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## 📊 Scripts de Análisis

### Bundle Size
```bash
npm run analyze
```
Analiza el tamaño del bundle y sus dependencias.

### Type Check
```bash
npm run type-check
```
Verifica tipos de TypeScript sin compilar.

**Implementación**:
```json
{
  "scripts": {
    "analyze": "vite-bundle-visualizer",
    "type-check": "tsc --noEmit"
  }
}
```

## 🔧 Scripts de Utilidad

### Format Code
```bash
npm run format
```
Formatea el código con Prettier.

### Clean
```bash
npm run clean
```
Limpia archivos generados y cache.

**Implementación**:
```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "clean": "rm -rf dist node_modules/.vite"
  }
}
```

## 📝 Ejemplo de package.json Completo

```json
{
  "name": "gastrometrics",
  "version": "1.0.0",
  "description": "Plataforma SaaS de análisis gastronómico",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "seed": "node scripts/seed.js",
    "backup": "node scripts/backup.js",
    "restore": "node scripts/restore.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "analyze": "vite-bundle-visualizer",
    "clean": "rm -rf dist node_modules/.vite"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.12.7",
    "lucide-react": "^0.index.378.0",
    "sonner": "^2.0.3",
    "react-hook-form": "^7.55.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.13.1",
    "@typescript-eslint/parser": "^7.13.1",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "typescript": "^5.2.2",
    "vite": "^5.3.1",
    "vitest": "^1.6.0",
    "prettier": "^3.3.2"
  }
}
```

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo Local
```bash
# 1. Instalar dependencias
npm install

# 2. Inicializar datos de prueba
npm run seed

# 3. Iniciar desarrollo
npm run dev

# 4. En otra terminal, ejecutar tests
npm run test:watch
```

### Preparación para Producción
```bash
# 1. Limpiar build anterior
npm run clean

# 2. Verificar tipos
npm run type-check

# 3. Ejecutar linter
npm run lint

# 4. Ejecutar tests
npm run test

# 5. Construir para producción
npm run build

# 6. Preview local
npm run preview
```

### Mantenimiento de Datos
```bash
# Backup de datos actuales
npm run backup

# Resetear a datos iniciales
npm run seed

# Restaurar desde backup
npm run restore
```

## 📚 Notas Adicionales

### Variables de Entorno
Todos los scripts respetan las variables definidas en `.env`:
- `NODE_ENV`: development/production
- `VITE_*`: Variables accesibles en el cliente
- Ver `.env.example` para lista completa

### Hooks de Git (Opcional)
Puedes agregar hooks para ejecutar scripts automáticamente:

```json
{
  "scripts": {
    "prepare": "husky install",
    "pre-commit": "npm run lint && npm run type-check",
    "pre-push": "npm run test"
  }
}
```

### CI/CD
Scripts optimizados para integración continua:
```yaml
# .github/workflows/ci.yml
- run: npm run lint
- run: npm run type-check
- run: npm run test
- run: npm run build
```

---

**💡 Tip**: Usa `npm run` para ver todos los scripts disponibles
