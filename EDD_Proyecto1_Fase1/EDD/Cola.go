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

func (c *Cola) Encolar(nomb string, carn int, contr string) {
	nuevo := &NodoCola{nomb, carn, contr, nil}
	aux := c.Primero
	for aux.siguiente != nil {
		aux = aux.siguiente
	}
	aux.siguiente = nuevo
	c.tamaño++
}

func (c *Cola) Desencolar() {
	c.Primero = c.Primero.siguiente
	c.tamaño--
}

func (c *Cola) MostrarCola() {
	fmt.Println(c.Primero.Nombre)
	fmt.Println(c.Primero.Carnet)
	fmt.Println(c.Primero.Contraseña)
}
