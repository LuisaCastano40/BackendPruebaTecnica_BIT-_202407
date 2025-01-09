
// 1. IMPORTAR LAS DEPENDENCIAS Y MÓDULOS QUE NECESITAMOS
import express from 'express'; 
import dotenv from 'dotenv'; 
import { connectionMongo } from './src/config/dataBase.js';
import usersRouter from './src/routes/user.routes.js';
import loginRouter from './src/routes/login.routes.js';
import cors from 'cors'; 

// 2. configurar el uso de nuestro servidor y dependencias
const app = express(); 
dotenv.config(); 
connectionMongo();
const port = process.env.PORT || 3001
app.use(cors()); 

// Le indico las rutas que debe utilizar
app.use(express.json());
app.use('/usuarios', usersRouter);
app.use('/iniciarSesion', loginRouter);



// 3. ejecutar el servidor en nuestro computador
app.listen(port, ()=>{
    console.log('El servidor está ejecutándose correctamente, en el puerto ', port);
});

