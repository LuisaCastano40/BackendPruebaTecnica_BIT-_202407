// 1. importamos dependencias, módulos y/o funciones
import supertest from "supertest";
import app from "../app.js";//nos permite probar la conexion a DB, probar rutas -> probar los controllers
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";

/*
    Estructura del código

    Bloques describe por controlador:
    POST /api/createUser
    GET /api/showUsers
    POST /api/loginUser

    Pruebas individuales (it):
    Casos exitosos.
    Casos fallidos por validaciones o errores.ç

    Configuración global:
    beforeEach: Limpia la base de datos antes de cada prueba.
    afterAll: Cierra la conexión a la base de datos.

    Errores esperados:
    Falta de campos requeridos.
    Credenciales incorrectas.
    Usuario no encontrado.

*/

// 2. Definir los bloques de prueba
describe('Pruebas de los controladores de los usuarios', ()=>{

  /*
  Configuraciòn global de las pruebas
      beforeEach: para ejecutar acciones que queramos que se hagan antes de cada prueba
      afterAll: ejecuta acciones que queramos que se hagan al final de TODAS las pruebas
  */

  // limpiar base de datos antes de cada prueba
  beforeEach(async ()=>{
      await userModel.deleteMany({});//borre todo lo de la DB
   });

  //  cerrar la conexión a mongoDB despues de todas las pruebas
  afterAll(async ()=>{
      await mongoose.connection.close();
  });

  const testUser = {
      fullName: 'Jhon Doe',
      email: 'jhon@ejemplo.com',
      password: '123'
  }


  // 2.1 Defino bloque de pruebas para petición POST
  describe('Pruebas POST /users', ()=>{
      /*
          casos exitoso
          casos fallidos : faltan campos requeridos, credenciales incorrectas,
          elementos no encontrados
      */

      //primer caso de prueba: creaciòn de usuarios
      it('Debería crear un usuario correctamente', async()=>{
          const res = await supertest(app).post('/usuarios').send(testUser)

          //definir qué esperamos de esa respuesta
          expect(res.statusCode).toBe(201);
      });

      //segundo caso de prueba: error si falta campo obligatorio
      it('Debería devolver un error si falta un campo obligatorio', async()=>{
          const res = await supertest(app).post('/usuarios').send({email:testUser.fullName})

          //definir qué esperamos de esa respuesta
          expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al crear un usuario');
      });

  });


  // 2.2 Defino bloque de pruebas para peticiòn GET
  describe('Pruebas GET /users', ()=>{

      // primer caso de prueba: debería indicar que no hay usuarios almacenados
      it('Debería indicar que no hay usuarios almacenados', async()=>{
          const res = await supertest(app).get('/usuarios')
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('mensaje','No hay usuarios almacenados')
      });


      // Si van a probar que funcione la peticion get teniendo usuarios almacenados
      //await new userModel(testUser).save(); //deben primero guardar un usuario
      
  });

});
  

    // // (OPCIONAL)
    // // Bloque para pruebas de inicio de sesión ------------------------------------------------------------------------------
    // describe('POST /iniciarSesion', () => {
    //   beforeEach(async () => {
    //     const hashedPassword = await bcrypt.hash(testUser.password, 10);
    //     await new userModel({ ...testUser, password: hashedPassword }).save();
    //   });
  
    //   it('Debería iniciar sesión correctamente con credenciales válidas', async () => {
    //     const response = await supertest(app)
    //       .post('/iniciarSesion')
    //       .send({
    //         emailLogin: testUser.email,
    //         passwordLogin: testUser.password,
    //       });
  
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toHaveProperty('mensaje', 'Inicio de sesión exitoso');
    //   });
  
    //   it('Debería devolver un error si el usuario no existe', async () => {
    //     const response = await supertest(app)
    //       .post('/iniciarSesion')
    //       .send({
    //         emailLogin: 'notfound@example.com',
    //         passwordLogin: testUser.password,
    //       });
  
    //     expect(response.statusCode).toBe(404);
    //     expect(response.body).toHaveProperty('mensaje', 'Usuario no encontrado, por favor registrarse');
    //   });
  
    //   it('Debería devolver un error si la contraseña es incorrecta', async () => {
    //     const response = await supertest(app)
    //       .post('/iniciarSesion')
    //       .send({
    //         emailLogin: testUser.email,
    //         passwordLogin: 'WrongPassword!',
    //       });
  
    //     expect(response.statusCode).toBe(401);
    //     expect(response.body).toHaveProperty('mensaje', 'Contraseña incorrecta');
    //   });
    // });
