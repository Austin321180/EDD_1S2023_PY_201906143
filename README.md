# EDD_1S2023_PY_201906143
###### Austin Antonio Alvarez Medina 
###### 201906143
# Manual Técnico
## Introduccion

La primera fase del proyecto consiste en aplicar estructura de datos en un aplicacion llamada GoDrive donde un aministrador puede iniciar sesión y tendra opciones a realizar, podra agregar alumnos al sistema de forma manual o de forma masiva mediante un archivo csv, estos alumnos estaran guardados mediante una cola esperando a ser aceptados o rechazados, cosa que el admin podra hacer, si el admin acepta o rechaza tendra una bitacora donde saldra la informacion junto con la hora y fecha, cuando se acepta los alumnos pasas a estar en una lista doblemente enlazada donde tambien tendra una bitacora que marca la fecha y hora de cuando inician sesión, si se rechazan solo saldran de la cola, la bitacora del admin se grafica mediante la herramienta graphviz, al igual que la cola y la lista doblemente enlazada y esta tambien graficada con la bitcora del alumno.

# Sistema

> Windows 11
> Procesador: Intel(R) Core(TM) i7-8565U CPU @ 1.80GHz   1.99 GHz
> Ram: 8.00 GB
> Tipo de sistema: 64 bits, procesador basado en x64


## Lenguaje de programación y herramientas utilizadas

El lenguajde de progamacion y herramientasa utilizadas son:

- Golang - Lenguaje de programación de código abierto desarrollado por Google.
- Graphviz - Herramienta de software de visualización de gráficos.
- Visual Studio Code - Entorno de desarrollo integrado (IDE).

## Librerias
- Bufio - Permite tomar los datos que escribo en la consola y sin importar espacios.
- encoding/csv - Leer archivos csv.
- fmt - Libreria de golang perimte ecciones en consola.
- io - Manejo de errores.
- os - Permite acciones en el sistema operativo.
- strconv - Relaiza conversiones.
- time - Toma la fecha y hora del dispositivo.
- github.com/gen2brain/dlgs - Proporciona una interfaz de usuario simple para mostrar diálogos modales

# Instalacion
go mod - Para que los paquetes que tengamos en una carpeta aparte los reconozca Golang.


```sh
go mod init
```

Para ejecutar la aplicación

```sh
go run main.go  
```
