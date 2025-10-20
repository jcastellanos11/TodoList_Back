# ⚙️ To-Do List Backend

Este es el **backend** del proyecto **To-Do List**, encargado de manejar la lógica del servidor y la persistencia de datos.  
Está desarrollado con **Next.js** (API Routes) y utiliza **PostgreSQL** como base de datos, sin ORM (solo consultas SQL nativas).

> 🧠 El proyecto fue desarrollado en **6 horas**, utilizando **ChatGPT como asistente de desarrollo** para la generación, estructuración y depuración del código.

---

## 🚀 Tecnologías utilizadas

- 🧩 **Next.js** – Framework de React con soporte para API Routes.
- 🗃️ **PostgreSQL** – Base de datos relacional para almacenar las tareas.
- 🧰 **node-postgres (pg)** – Cliente para conectarse a PostgreSQL sin ORM.
- 🔐 **dotenv** – Manejo de variables de entorno.
- 🌍 **CORS manual** – Configurado para permitir solicitudes del frontend.

---

## 📂 Estructura del proyecto

```
backend/
├── lib/
│   └── db.js                  # Conexión a la base de datos PostgreSQL
├── pages/
│   └── api/
│       └── tasks/
│           ├── index.js       # Endpoint principal (GET, POST)
│           └── [id].js        # Endpoint por id (PUT, DELETE)
├── .env                       # Variables de entorno
├── package.json
├── next.config.cjs            # Configuración de CORS y Next.js
└── README.md
```

---

## ⚙️ Configuración inicial

### 1️⃣ Instalar dependencias
Desde la carpeta `backend/`:

```bash
npm install
```

### 2️⃣ Configurar variables de entorno

Crea un archivo `.env` con tu configuración local o de producción:

```bash
# Base de datos PostgreSQL
DATABASE_URL=postgresql://usuario:password@localhost:5432/todolist

# URL base del backend
API_BASE_URL=http://localhost:3000

# URL del frontend (para CORS)
FRONTEND_URL=http://localhost:5173
```

---

## ▶️ Ejecución del servidor

Inicia el servidor de desarrollo con:

```bash
npm run dev
```

Por defecto, estará disponible en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧠 Endpoints disponibles

### `GET /api/tasks`
Obtiene todas las tareas.

### `POST /api/tasks`
Crea una nueva tarea.  
**Body:**
```json
{
  "title": "Tarea 1",
  "description": "Descripción de la tarea"
}
```

### `PUT /api/tasks/:id`
Actualiza una tarea existente.  
**Body:**
```json
{
  "title": "Nuevo título",
  "description": "Descripción actualizada",
  "completed": true
}
```

### `DELETE /api/tasks/:id`
Elimina una tarea por ID.

---

## 💾 Script SQL base

El proyecto incluye un archivo `init.sql` (en la carpeta `database/`) para crear la tabla de tareas:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 CORS (Cross-Origin Resource Sharing)

CORS se maneja manualmente en cada endpoint con cabeceras personalizadas:

```js
res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
if (req.method === 'OPTIONS') return res.status(200).end();
```

---

## 💡 Buenas prácticas implementadas

- Código modular y reutilizable (`lib/db.js`).
- Consultas SQL seguras con parámetros (`$1`, `$2`, etc.).
- Validación de métodos HTTP en cada endpoint.
- Variables de entorno centralizadas (`.env`).
- Logs informativos para depuración local.

---

## 🧩 Variables de entorno

| Variable | Descripción | Ejemplo |
|-----------|--------------|----------|
| `DATABASE_URL` | URL de conexión a la base de datos PostgreSQL | `postgresql://user:pass@localhost:5432/todolist` |
| `API_BASE_URL` | URL base del backend | `http://localhost:3000` |
| `FRONTEND_URL` | URL permitida para CORS | `http://localhost:5173` |

---

## 🧱 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia el entorno de desarrollo de Next.js. |
| `npm run build` | Compila el proyecto para producción. |
| `npm start` | Inicia el servidor en modo producción. |

---

## 📘 Ejemplo de conexión a la base de datos

```js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
```

---

## 👨‍💻 Autor

**John Janer Castellanos**  
Desarrollador Full Stack — [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com)

---

### 🏁 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.  
Si lo usas o modificas, por favor da crédito al autor original.
