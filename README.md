# 🌤️ Clima App - Aplicación CLI de Consulta Meteorológica

> Una aplicación moderna de línea de comandos (CLI) desarrollada en **Node.js** que permite consultar el clima en tiempo real de cualquier ciudad del mundo con una interfaz interactiva y amigable.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)
[![Code Style](https://img.shields.io/badge/Code%20Style-ES6%2B-yellow)](https://es6.io/)

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Utilizadas](#api-utilizadas)
- [Dependencias](#dependencias)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Troubleshooting](#troubleshooting)
- [Licencia](#licencia)

---

## ✨ Características

- 🔍 **Búsqueda Inteligente de Ciudades** - Busca ciudades en toda la geosfera usando OpenStreetMap
- 🌡️ **Información Meteorológica Completa** - Temperatura actual, mínima, máxima y pronóstico
- 💾 **Historial Persistente** - Guarda automáticamente tus búsquedas recientes en BD local
- 🎨 **Interfaz Colorida** - Presentación visual atractiva con esquema de colores temático
- 📱 **CLI Interactivo** - Navegación fluida mediante menús intuitivos con `inquirer`
- ⚡ **Rendimiento Optimizado** - Requests con timeout y manejo robusto de errores
- 🌍 **Soporte Multiidioma** - Resultados en español por defecto (configurable)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de contar con:

- **Node.js**: v18.0.0 o superior (preferiblemente v20+)
- **NPM**: v9.0.0 o superior (incluido con Node.js)
- **API Key de OpenWeather**: Obtén una gratis en [openweathermap.org](https://openweathermap.org/api)
- **Sistema Operativo**: Windows, macOS o Linux

### Verificar las versiones instaladas:

```bash
node --version    # v18.x.x o superior
npm --version     # v9.x.x o superior
```

---

## 📦 Instalación

### 1. Clonar o descargar el repositorio

```bash
# Opción 1: Con Git
git clone <tu-repositorio>
cd 05-clima-app

# Opción 2: Descargar archivo ZIP
# Luego extraer y entrar al directorio
cd 05-clima-app
```

### 2. Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias especificadas en `package.json`:
- `axios` - Cliente HTTP para requests
- `inquirer` - Interfaz interactiva en CLI
- `colors` - Colorización de texto en consola
- `dotenv` - Gestión de variables de entorno

---

## ⚙️ Configuración

### Paso 1: Obtener API Key de OpenWeather

1. Visita [openweathermap.org](https://openweathermap.org/api)
2. Regístrate o inicia sesión en tu cuenta
3. Ve a la sección "API keys"
4. Copia tu clave API

### Paso 2: Crear archivo `.env`

En la raíz del proyecto, crea un archivo `.env`:

```bash
# Linux/macOS
touch .env

# Windows (PowerShell)
New-Item .env -ItemType file
```

### Paso 3: Agregar tu API Key

Abre el archivo `.env` y añade:

```env
openweather_key=tu_api_key_aqui
```

**Ejemplo completo:**
```env
openweather_key=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

⚠️ **Nota Importante**: El archivo `.env` debe estar en `.gitignore` para no exponer tus credenciales.

---

## 🚀 Uso

### Iniciar la aplicación

```bash
npm start
```

O directamente:

```bash
node index.js
```

### Flujo de Uso

Una vez ejecutada la aplicación verás el menú principal:

```
===========================
   Selecciona una opción
===========================

? ¿Qué deseas hacer?
❯ 1. Buscar Ciudad
  2. Historial
  0. Salir
```

#### Opción 1: Buscar Ciudad

1. Selecciona `Buscar Ciudad`
2. Ingresa el nombre de la ciudad
3. Si existen resultados, verás una lista de coincidencias
4. Selecciona la ciudad deseada
5. Se mostrará información completa del clima

#### Opción 2: Ver Historial

- Muestra todas las ciudades consultadas previamente
- El historial se persiste automáticamente en `DB/database.json`

#### Opción 0: Salir

- Cierra la aplicación limpiamente

---

## 📁 Estructura del Proyecto

```
05-clima-app/
├── index.js                     # Punto de entrada principal
├── package.json                 # Configuración del proyecto y dependencias
├── .env                         # Variables de entorno (no versionado)
├── .gitignore                   # Archivos ignorados por Git
├── README.md                    # Este archivo
│
├── DB/
│   └── database.json            # Base de datos local con historial
│
└── src/
    ├── config/
    │   └── colors.config.js     # Configuración centralizada de temas de color
    │
    ├── helpers/
    │   └── inquierer.js         # Funciones de interacción CLI con inquirer
    │
    ├── models/
    │   └── busqueda.js          # Clase modelo con lógica de búsqueda
    │
    └── ui/
        └── clima.ui.js          # Componentes visuales de presentación
```

### Descripción de Archivos Clave

| Archivo | Descripción |
|---------|------------|
| `index.js` | Controlador principal que orquesta el flujo de la aplicación |
| `busqueda.js` | Clase que maneja todas las llamadas a APIs externas |
| `inquierer.js` | Funciones para crear menús y capturar entrada del usuario |
| `clima.ui.js` | Funciones para renderizar la información en consola |
| `colors.config.js` | Tema centralizado de colores para toda la app |

---

## 🌐 API Utilizadas

### 1. **Nominatim (OpenStreetMap)**

Búsqueda geográfica e identificación de coordenadas.

```
GET https://nominatim.openstreetmap.org/search
```

**Parámetros:**
- `q`: término de búsqueda (nombre de ciudad)
- `format`: "json"
- `limit`: máximo 5 resultados
- `accept-language`: "es" (español)

**Respuesta:**
```json
[
  {
    "place_id": 293829477,
    "display_name": "Bogotá, Bogotá, Distrito Capital, Colombia",
    "lat": 4.5981,
    "lon": -74.0758
  }
]
```

### 2. **OpenWeather API**

Datos meteorológicos en tiempo real.

```
GET https://api.openweathermap.org/data/2.5/forecast
```

**Parámetros:**
- `lat`: latitud
- `lon`: longitud
- `appid`: tu API key (requerido)
- `lang`: "es" (español)
- `units`: "metric" (Celsius)

**Respuesta (datos principales):**
```json
{
  "list": [
    {
      "dt": 1707000000,
      "main": {
        "temp": 22.5,
        "temp_min": 18.3,
        "temp_max": 25.8
      },
      "weather": [
        {
          "id": 800,
          "description": "cielo claro"
        }
      ]
    }
  ]
}
```

---

## 📚 Dependencias

| Dependencia | Versión | Propósito |
|------------|---------|----------|
| `axios` | ^1.12.2 | Cliente HTTP para llamadas a APIs |
| `inquirer` | ^12.10.0 | Interfaz interactiva en CLI |
| `colors` | ^1.4.0 | Colorización y estilos en terminal |
| `dotenv` | ^17.2.3 | Carga de variables de entorno |

### Versión de Node.js

El proyecto está configurado como **módulo ES6** (`"type": "module"` en `package.json`), lo que permite usar `import/export` directamente sin transpilación.

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Buscar el clima en Bogotá

```bash
$ npm start

? ¿Qué deseas hacer? › 1. Buscar Ciudad

? Ciudad (0 para cancelar): bogotá

? Seleccione el lugar:
❯ 1. Bogotá, Bogotá, Distrito Capital, Colombia
  2. Bogotá, Cauca, Colombia
  3. Bogotá Nariño, Colombia
  (0). Cancelar

# Seleccionas la primera opción

========================================
   🌤 Información del Clima
========================================

 Ciudad:      Bogotá, Bogotá, Distrito Capital, Colombia
 Latitud:     4.5981
 Longitud:    -74.0758

----------------------------------------
 Temperatura: 22.5 °C
 Mínima:      18.3 °C
 Máxima:      25.8 °C

----------------------------------------
 Condición:   cielo claro

========================================
```

### Ejemplo 2: Ver historial de búsquedas

```bash
? ¿Qué deseas hacer? › 2. Historial

========================================
   🕘 Historial de búsquedas
========================================

  1. Bogotá, Bogotá, Distrito Capital, Colombia
  2. Medellín, Medellín, Antioquia, Colombia
  3. Cartagena, Cartagena, Bolívar, Colombia
```

---

## 🐛 Troubleshooting

### Error: `ENOENT: no such file or directory`

**Causa:** El archivo `.env` no existe o no está en la ruta correcta.

**Solución:**
```bash
# Verificar que estés en la carpeta raíz
ls -la        # macOS/Linux
dir           # Windows

# Crear el archivo .env
echo "openweather_key=TU_KEY" > .env
```

### Error: `Error: load ENOENT: no such file or directory, open '.env'`

**Causa:** Variables de entorno no configuradas.

**Solución:**
```bash
# Asegúrate de crear el archivo .env con tu API key
touch .env
# Añade tu clave: openweather_key=your_key_here
```

### Error: `401 Unauthorized`

**Causa:** API key de OpenWeather inválida o expirada.

**Solución:**
1. Verifica tu API key en openweathermap.org
2. Asegúrate de haberla copiado correctamente en `.env`
3. Si es muy antigua, genera una nueva

### Error: `ETIMEDOUT` o `ECONNREFUSED`

**Causa:** Problemas de conectividad con las APIs.

**Solución:**
1. Verifica tu conexión a internet
2. Comprueba que las APIs estén disponibles (status.openweathermap.org)
3. Intenta de nuevo en unos minutos
4. Verifica tu firewall/proxy

### No se guardan las búsquedas en el historial

**Causa:** Permisos de archivo o carpeta DB no creada.

**Solución:**
```bash
# Crear la carpeta DB si no existe
mkdir -p DB

# Crear el archivo database.json
echo '{"historial":[]}' > DB/database.json

# Verificar permisos
ls -la DB/
```

---

## 🎓 Origen del Proyecto

Este proyecto forma parte del curso **"Node de Cero a Experto en React JS"** disponible en Udemy. Es un excelente ejemplo práctico de:

- ✅ Desarrollo con Node.js puro (sin frameworks)
- ✅ Consumo de APIs REST
- ✅ Manejo de variables de entorno
- ✅ Arquitectura modular y escalable
- ✅ Interfaz CLI interactiva con inquirer
- ✅ Persistencia de datos con JSON

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia ISC**.

```
ISC License

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.
```

---

## 👨‍💻 Autor

**Cesar Barrero**

Desarrollador Full Stack | Estudiante de Node.js y React

- 🐙 GitHub: [Tu GitHub](https://github.com)
- 💼 LinkedIn: [Tu LinkedIn](https://linkedin.com)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios significativos:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Notas de Desarrollo

- El proyecto utiliza ES6 modules (`import/export`)
- Está configurado para ejecutarse con `node index.js` directamente
- Las APIs tienen timeouts de 5 segundos para evitar cuelgues
- El historial se persiste automáticamente después de cada búsqueda exitosa
- Los colores se aplican mediante un sistema temático centralizado

---

## 🔄 Roadmap Futuro

- [ ] Agregar pronóstico extendido (7-14 días)
- [ ] Soporte para múltiples idiomas
- [ ] Exportar historial a CSV
- [ ] Almacenamiento en base de datos real (MongoDB, PostgreSQL)
- [ ] Tests automatizados
- [ ] Configuración de preferencias (temperatura en Fahrenheit, etc.)

---

**Último actualizado:** 17 de febrero de 2026  
**Versión:** 1.0.0
