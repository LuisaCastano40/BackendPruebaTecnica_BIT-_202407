// La pruebas unitarias testean funciones

// 1. importar dependencias, servicios, funciones
import suma from "../src/utils/ejemplo.js";


// 2. Definir un bloque de pruebas -> fn suma
/*
    PALABRAS RESERVADAS PARA HACER PRUEBAS SON:
    Describe -> Agrupar el bloque de pruebas
    it -> Define casos individuales dentro de cada bloque de pruebas
    Expect - toBe -> Que es lo que queremos que suceda -> definimos cuál es la respuesta que debe suceder
*/
// 1. paso una descripción, y 2. luego una fn flecha
describe('Probar la función suma', ()=>{
    // Acá está nuestro bloque de pruebas

    // caso de prueba 1: se sumen números positivos
    // 1. Describo qué es lo que quiero que suceda
    // 2. definir que es lo que espera que suceda
    it('debería sumar dos números positivos correctamente',()=>{
        expect(suma(5,2)).toBe(7);
    });

    // caso de prueba 2: se sumen números negativos
    it('debería sumar números negativos correctamente', ()=>{
        expect(suma(-2,-4)).toBe(-6);
    });

});


