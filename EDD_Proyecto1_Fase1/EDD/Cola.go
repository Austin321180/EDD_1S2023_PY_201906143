package edd

import (
	"fmt"
	"strconv"
)

type NodoCola struct {
	Nombre     string
	Carnet     int
	Contraseña string
	siguiente  *NodoCola
}

type Cola struct {
	Primero *NodoCola
	tamaño  int
}

func (c *Cola) vacia() bool {
	if c.tamaño == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Encolar(nomb string, carn int, contr string) {
	if c.Buscar(carn) {
		fmt.Println("El carnet:", carn, "ya existe en el sistema.\n")
		return
	} else {

		if c.vacia() {
			nuevoNodo := &NodoCola{nomb, carn, contr, nil}
			c.Primero = nuevoNodo
			fmt.Println("Se guardo correctamente ", nomb)
			c.tamaño++
		} else {
			nuevoNodo := &NodoCola{nomb, carn, contr, nil}
			aux := c.Primero
			for aux.siguiente != nil {
				aux = aux.siguiente
			}
			aux.siguiente = nuevoNodo
			fmt.Println("Se guardo correctamente ", nomb)
			c.tamaño++
		}
	}
}

func (c *Cola) Desencolar() {
	if c.vacia() {
		fmt.Println("No hay datos en la cola")
	} else {
		c.Primero = c.Primero.siguiente
		c.tamaño--

	}
}
func (c *Cola) Buscar(valor int) bool {
	nodo := c.Primero
	for nodo != nil {
		if nodo.Carnet == valor {
			return true
		}
		nodo = nodo.siguiente
	}
	return false
}

func (c *Cola) MostrarCola() {
	if c.vacia() {
		fmt.Println("No hay datos enla cola")
	} else {
		fmt.Println("En la cola: ", c.tamaño)
		fmt.Println("Estudiante actual en la cola: ", c.Primero.Nombre)

	}

}

func (c *Cola) GrafC() {
	nombre_archivo := "./cola.dot"
	nombre_imagen := "cola.jpg"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull[label=\"null\"];\n"
	aux := c.Primero
	contador := 0
	for i := 0; i < c.tamaño; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + " ["
		texto = texto + "label = \"{" + strconv.Itoa(aux.Carnet) + " " + aux.Nombre + "}\"];\n"
		aux = aux.siguiente
	}

	for i := 0; i < c.tamaño-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "-> nodo" + strconv.Itoa(c) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull;\n"
	texto += "}"
	crearArch(nombre_archivo)
	escribirArch(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)

}
