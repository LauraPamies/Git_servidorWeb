// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
const request = require ('request')
const assert = require ('assert')

const IP_PUERTO="http://localhost:8080"

// --------------------------------------------------------------------------------
// main ()
// --------------------------------------------------------------------------------
describe( "Test 1: TEST DEL SERVIDOR", function() {

	// ........................................................................... 
	// 1.
	// ........................................................................... 
	

	it( "probar POST /f/altaMedicion", function( hecho ) {

		request.post(
			{ url : IP_PUERTO+"/altaMedicion",
			  headers : { 'User-Agent' : 'laura', 'Content-Type' : 'application/json' },
			  body : JSON.stringify( {id: null, valor: 88, fecha: "fecha test servidor",latitud: 43, longitud: 55 } )
			},
			function( err, respuesta, carga ) {

				assert.equal( err, null, "¿ha habido un error?: " + err )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
				hecho()
			} // callback
		) // .post
	})

	// ........................................................................... 
	// 2. 
	// ........................................................................... 
	it( "probar GET /f/medicionvalor", function( hecho ) {

		request.get(
			{ url : IP_PUERTO+"/medicionvalor/88",
			  headers : { 'User-Agent' : 'laura', 'Content-Type' : 'application/json' },
			  //body : JSON.stringify( {valor: 99 } )
			},
			function( err, respuesta, carga ) {

				assert.equal( err, null, "¿ha habido un error?: " + err )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )

				 console.log( " carga = " + carga )
				

				hecho()
			} // callback
		) // .get
	}) // it

	// ........................................................................... 
	// 3. 
	// ........................................................................... 
	it( "probar POST /f/borrarFilaTablaTest", function( hecho ) {

		request.post(
			{ url : IP_PUERTO+"/borrarFilaTablaTest",
			  headers : { 'User-Agent' : 'laura', 'Content-Type' : 'application/json' },
			  body :null
			},
			function( err, respuesta, carga ) {

				assert.equal( err, null, "¿ha habido un error?: " + err )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
				hecho()
			} // callback
		) // .post
	})
	
}) // describe

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
