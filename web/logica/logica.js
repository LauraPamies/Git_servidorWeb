// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

const sqlite3 = require("sqlite3")

const cargador = require("./cargador.js")

// --------------------------------------------------------------------------------
//
// nombreBD: Texto -> logica() -> Logica
//
// Donde:
//
// Logica = { 
//   f: ( Texto TArg -> () -> TRes ), // para llamar a una función de la lógica por
//                                     // su nombre en texto
//   funciones: [ { conexion: TDep, f: TArg -> () -> TRes } ]_Texto // array asociativo
//                                                             // con las funciones de logica
// }
//
// (ver cargador.js)
//
// --------------------------------------------------------------------------------

module.exports = class Logica {
	// .................................................................
	// nombreBD: Texto
	// -->
	// constructor () -->
	// .................................................................
	constructor(nombreBD, cb) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			(err) => {
				if (!err) {
					this.laConexion.run("PRAGMA foreign_keys = ON") //Para activar las claves foráneas
				}
				cb(err)
			})
	} // ()
	
	// .................................................................
	// datos:{dni:Texto, nombre:Texto: apellidos:Texto}
	// -->
	// insertarPersona() -->
	// .................................................................
	insertarMedicion(datos) {
		var textoSQL = //ES RECOMENDABLE HACERLO DE ESTA MANERA (en vez de la manera del delete de arriba)
			"insert into Mediciones values($id, $valor, $fecha );" //todo lo que empiece por $ son parámetros
		var valoresParaSQL = {
			$id: datos.id,
			$valor: datos.valor,
			$fecha: datos.fecha
		}
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()


	

	// .................................................................
	// dni:Texto
	// -->
	// buscarPersonaPorDNI() <--
	// <--
	// {dni:Texto, nombre:Texto: apellidos:Texto}
	// .................................................................
	buscarMedicion() {	//devuelve un array de objetos (pero al buscar un dni solo tendrá un objeto el array)
		var textoSQL = "select * from Mediciones"; //el asterisco hace que se parametrice (osea $dni es el parámetro del método) //ESTO ES POR SEGURIDAD
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL,  //el .all devuelve arrays de objetos
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	} // ()

	buscarMedicionValorFecha(valor, fecha) {	//devuelve un array de objetos (pero al buscar un dni solo tendrá un objeto el array)
		var textoSQL = "select * from Mediciones where valor = $valor AND fecha = $fecha"; //el asterisco hace que se parametrice (osea $dni es el parámetro del método) //ESTO ES POR SEGURIDAD
		var valoresParaSQL = {
			$valor : valor,
			$fecha : fecha
		}
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL,valoresParaSQL,  //el .all devuelve arrays de objetos
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	}


	



	// .................................................................
	// cerrar() -->
	// .................................................................
	cerrar() {
		return new Promise((resolver, rechazar) => {
			this.laConexion.close((err) => {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()} // class
	// .....................................................................
	// .....................................................................

}
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
