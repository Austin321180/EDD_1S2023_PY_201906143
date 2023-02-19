package edd

import "fmt"

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
	if c.vacia() {
		nuevoNodo := &NodoCola{nomb, carn, contr, nil}
		c.Primero = nuevoNodo
		c.tamaño++
	} else {
		nuevoNodo := &NodoCola{nomb, carn, contr, nil}
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		c.tamaño++
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

func (c *Cola) MostrarCola() {
	if c.vacia() {
		fmt.Println("No hay datos enla cola")
	} else {
		fmt.Println("En la cola: ", c.tamaño)
		fmt.Println("Estudiante actual en la cola: ", c.Primero.Nombre)
	
	}
	
}
