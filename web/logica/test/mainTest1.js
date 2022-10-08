
// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")	//IMPORTAR LA CLASE LÓGICA
var assert = require("assert")	//El mocha necesita esta clase para hacer las pruebas
// ........................................................
// main ()
// ........................................................
describe("Test 1: insertar una Medicion", function () {	//las pruebas se hacen dentro de esta función siempre
	// ....................................................
	// ....................................................
	var laLogica = null
	// ....................................................
	// ....................................................
	it("conectar a la base de datos", function (hecho) {	//"it" es para hacer la prueba concreta (título y función con callback)
		//AQUI EMPIEZA LA PRUEBA
		laLogica = new Logica(
			"../bd/datos.bd",
			function (err) {
				if (err) {
					throw new Error("No he podido conectar con datos.db")
				}
				hecho()
			})
	}) // it

	
	// it
	// ....................................................
	// ....................................................

	//PRUEBA ESCRITA SIN TRY CATCH
	it("puedo insertar y buscar una medicion",	//Esta prueba es importante porque usa assert
		async function () {
			//AQUI EMPIEZA LA PRUEBA
			//aqui se puede poner trycatch para coger los errores de los awaits

			await laLogica.insertarMedicion(
				{
					id: null, valor: 88,
					fecha: "fecha test logica",
					latitud: 43,
					longitud: 55
				})
			var res = await laLogica.buscarMedicionValor(88)
			//EL ASSERT ES LO QUE VERIFICA SI ESTÁ BIEN O MAL (el 1º parámetro es el que nos da, el 2º parámetro es el que nos tiene que dar, el 3º parámetro es el mensaje de error)
			//assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			
			assert.equal(res[0].valor, 88, "¿no es 88?") //EL EQUAL ES PARA COMPARAR A CON B
	})

	it("Borro las mediciones añadidas en la BBDD",	//Esta prueba es importante porque usa assert
	async function () {
		//AQUI EMPIEZA LA PRUEBA
		//aqui se puede poner trycatch para coger los errores de los awaits

		await laLogica.borrarFilaTablaTest();
		
})
	
	// ....................................................
	// ....................................................
	it("cerrar conexión a la base de datos",
		async function () {
			try {
				await laLogica.cerrar()
			} catch (err) {
				// assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
				throw new Error("cerrar conexión a BD fallada: " + err)
			}
		}) // it
}) // describe
