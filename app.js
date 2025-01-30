
// 1. IMPORTAR LAS DEPENDENCIAS Y MÓDULOS QUE NECESITAMOS
import express from 'express'; 
import dotenv from 'dotenv'; 
import { connectionMongo } from './src/config/dataBase.js';
import usersRouter from './src/routes/user.routes.js';
import loginRouter from './src/routes/login.routes.js';
import cors from 'cors'; 
// importaciones para acceder a las rutas del front - configurar el acceso al front
import path from "path";
import { fileURLToPath } from "url";

// 2. configurar el uso de nuestro servidor y dependencias
const app = express(); 
dotenv.config(); 
connectionMongo();
app.use(cors()); 

// configuraciones para acceder al front
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Le indico las rutas que debe utilizar
app.use(express.json());
app.use('/usuarios', usersRouter);
app.use('/iniciarSesion', loginRouter);

// vamos a hacer la petición para que se muestre nuestro front
// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal para servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Exportar la aplicación sin iniciar el servidor
export default app;

