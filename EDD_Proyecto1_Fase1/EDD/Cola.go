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

func (c *Cola) Vacia() bool {
	if c.tamaño == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Encolar(nomb string, carn int, contr string) {
	if c.Buscar(carn) { //cuando voy a agregar mando a llamar a mi funcion buscar y si me retorna true imprime un mensaje y no retorna nada
		fmt.Println("El carnet:", carn, "ya existe en el sistema.")
		return
	} else { //si me retorna false entonces ya lo imgresa normal

		if c.Vacia() {
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
	if c.Vacia() {
		fmt.Println("No hay datos en la cola")
	} else {
		c.Primero = c.Primero.siguiente
		c.tamaño--
	}
}
func (c *Cola) Buscar(valor int) bool { //buscar un archivo repetido
	nodo := c.Primero //entro como el primer valor
	for nodo != nil { //verifico que no este vacio
		if nodo.Carnet == valor { //como no esta vacio compara el valor por carnet
			return true //si es igual entonces retorna true
		}
		nodo = nodo.siguiente //pasa al siguiente
	}
	return false //sino está retorna false
}

func (c *Cola) MostrarCola() {
	if c.Vacia() {
		fmt.Println("No hay datos en la cola")
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
	texto += "node[shape = record, style = solid, color = green, fillcolor = palegreen, fontname=\"Arial\"];\n"
	texto += "nodonull[label=\"null\"];\n"
	aux := c.Primero
	contador := 0
	for i := 0; i < c.tamaño; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + " ["
		texto = texto + "label = \"{" + strconv.Itoa(aux.Carnet) + " " + aux.Nombre + "|}\"];\n"
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
