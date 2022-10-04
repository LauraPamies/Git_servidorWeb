// --------------------------------------------------------------------------------
// mainServidorREST.js
// --------------------------------------------------------------------------------

const express = require('express')
const bodyParser = require('body-parser')

var cors = require('cors');

const fs = require('fs')

const Logica = require("../logica/logica.js")

// --------------------------------------------------------------------------------
// En vez de tener que instalar una regla para cada función de la lógica
// adopto el convenio (usando solamente GET) que la llamadas son
// 
//  ---------------------------
//  GET /nombreFuncionLogica
// 
//  datos en JSON en el cuerpo
//  ---------------------------
// 
//  de forma que con una regla sobra. Aunque esto "rompe" la filosofía REST.
// 
// --------------------------------------------------------------------------------
function cargarReglasUniversales(servidorExpress, laLogica) {

	// .......................................................
	// Reglas del API REST
	// .......................................................z

	// .......................................................
	// GET /prueba
	// .......................................................
	servidorExpress.get('/prueba', function (peticion, respuesta) {
		console.log(" * GET /prueba ")
		respuesta.send("¡Funciona!")
	}) // get /prueba


	// .......................................................
	// GET /medicion/		DEVUELVE TODAS LAS MEDICIONES
	// .......................................................
	servidorExpress.get("/medicion/",
		async function (peticion, respuesta) {
			console.log(" * GET /medicion ")
			// averiguo el dni
			
			// llamo a la función adecuada de la lógica
			var res = await laLogica.buscarMedicion()
			// si el array de resultados no tiene una casilla ...
			
			// todo ok
			respuesta.send(JSON.stringify(res))	//se pasa el obj persona a JSON para enviarlo
		}) // get /persona



	
	// .......................................................
	// post /altaMedicion/		INSERTA UNA NUEVA MEDICION
	// .......................................................
	servidorExpress.post("/altaMedicion", async function (peticion, respuesta) {
        console.log(" * POST /altaMedicion ")
        var datos = JSON.parse(peticion.body)
        console.log(datos.valor)

        await laLogica.insertarMedicion(datos)
        respuesta.send("OK")
    })



	


} // ()


// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
async function main() {

	//  
	//  cargo logica abriendo conexión
	//  
	var laLogica = null;

	laLogica = new Logica(
		"../bd/datos.bd", function (err) {
			if (err) {
				throw new Error("No he podido conectar con datos.db")
			}
		})

	//  
	// creo el servidor
	//  
	var servidorExpress = express()
	servidorExpress.use(cors());

	//  
	// para poder acceder a la carga de la petición http
	// (asumiendo que es JSON) hay que hacer esto:
	//  
	// OK: original:
	servidorExpress.use(bodyParser.text({ type: 'application/json' })) //significa que se comunica en json con los clientes


	//  
	// cargo las reglas REST
	//  
	cargarReglasUniversales(servidorExpress, laLogica)

	//  
	// configuradión automática para que sirva ficheros de ../ux
	//  
	servidorExpress.use(express.static("../ux"))

	//  
	// arranco el servidor y se queda escuchando
	//  
	var servicio = servidorExpress.listen(8080, function () {
		console.log("servidor REST escuchando en el puerto 8080: http://localhost:8080/Aplicacion.html ")
	})

	//  
	// capturo control-c para cerrar el servicio ordenadamente
	//  
	process.on('SIGINT', function () {
		console.log(" terminando ")
		servicio.close()
	})
} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
main()

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
