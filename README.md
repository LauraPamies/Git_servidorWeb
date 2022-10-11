# Git ServidorWeb

En este proyecto se ha implementado una parte de Web la cual inserta y muestra los datos de la base de datos y una parte de Servidor Web la cual realizada profundamente esas operaciones.
Para clonar el proyecto es necesario abrir git en una consola de comandos y hacer un "git clone https://github.com/LauraPamies/Git_servidorWeb.git"

# APARTADO PÁGINA WEB

Este es el diseño de la página web:

![image](https://user-images.githubusercontent.com/73590648/195056970-cc03eae6-3577-436b-8aa0-f42fa2709650.png)

## Mostrar medición por valor

En el primer apartado se encuentra un campo donde se puede ingresar un valor y mediante el botón 'Mostrar medición por valor' devuelve una tabla con todas las mediciones encontradas con ese valor.

## Mostrar todas las mediciones

En este botón al pulsarlo se mostrará una tabla con todas las mediciones encontradas.

# APARTADO SERVIDOR WEB

Para abrir el servidor hay que abrir una consola de comandos e ir a la ubicación de la carpeta del proyecto y dentro entrar en la carpeta 'servidorREST' y ejecutar el comando 'npm run servidor'

![image](https://user-images.githubusercontent.com/73590648/195058154-67f505b4-eba9-46f2-90fe-00a18bbf6ca0.png)

Para cerrar el servidor web se pulsa 'control + c ' y le indicamos que si deseamos cerrarlo

![image](https://user-images.githubusercontent.com/73590648/195061765-3986383a-48ab-47d8-bca2-693d76253684.png)


En el servidor se encuentran tres funciones:

## Get All Mediciones

Esta función llamará a una función de la lógica que obtiene mediante un método 'get' todas las mediciones de la base de datos.

## Get Medición Valor

Esta función llamará a una función de la lógica que obtiene mediante un método 'get' todas las mediciones de la base de datos con el valor solicitado.

## Alta Medición

Esta función llamará a una función de la lógica que inserta mediante un método 'post' la medición a la base de datos con los datos que se le pasen.

### Ejecución de los test

Hay dos tipos de test implementados, los test de la lógica y los test del servidor.

Para la ejecución de los test de la lógica hay que dirigirse a la carpeta del proyecto y dentro entrar en la carpeta 'logica' y ejecutar el comando 'npm run test'
el cual ejecutará los test de insertar, buscar y eliminar medida.


Para la ejecución de los test del servidor hay que dirigirse a la carpeta del proyecto y dentro entrar en la carpeta 'servidorREST' y ejecutar el comando 'npm run test' el cual ejecutará los test de insertar, buscar medida.
