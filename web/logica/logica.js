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
	// datos:{id:int, valor:int, fecha:Texto, latidud: int, longitud: int}
	// -->
	// insertarMedicion() -->
	// .................................................................
	insertarMedicion(datos) {
		var textoSQL =
			"insert into Mediciones values($id, $valor, $fecha, $latitud, $longitud );" //todo lo que empiece por $ son parámetros
		var valoresParaSQL = {
			$id: datos.id,
			$valor: datos.valor,
			$fecha: datos.fecha,
			$latitud: datos.latitud,
			$longitud: datos.longitud
		}
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()


	// .................................................................
	// borrarFilaTablaTest() -->
	// .................................................................

	borrarFilaTablaTest(){
		return new Promise((resolver,rechazar)=>{
			this.laConexion.run(
				"delete from Mediciones where valor = 88 AND fecha = 'fecha test logica' AND latitud= 43 AND longitud= 55",
				(err) => (err ? rechazar(err) : resolver())
			)
		})
	}


	// .................................................................
	// buscarTodasMediciones() -->
	// -->
	// {id:int, valor:int, fecha:Texto, latidud: int, longitud: int}
	// .................................................................
	buscarTodasMediciones() {	//devuelve un array de objetos
		var textoSQL = "select * from Mediciones";
		return new Promise((resolver, rechazar) => {
			this.laConexion.all(textoSQL,  //el .all devuelve arrays de objetos
				(err, res) => {
					(err ? rechazar(err) : resolver(res))
				})
		})
	} // ()


	// .................................................................
	// valor:int -->
	// --> buscarMedicionValor() -->
	// -->
	// {id:int, valor:int, fecha:Texto, latidud: int, longitud: int}
	// .................................................................
	buscarMedicionValor(valor) {	//devuelve un array de objetos
		var textoSQL = "select * from Mediciones where valor = $valor"; //el asterisco hace que se parametrice (osea $dni es el parámetro del método) //ESTO ES POR SEGURIDAD
		var valoresParaSQL = {
			$valor : valor,
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
