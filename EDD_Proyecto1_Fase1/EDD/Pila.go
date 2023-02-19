package edd

import "fmt"

type Datos struct {
	hora  string
	fecha string
}

type NodoPila struct {
	Hora      string
	Fecha     string
	siguient *NodoPila
}

type Pila struct {
	Arriba *NodoPila
	tamaño int
}

func (p *Pila) vacia() bool {
	if p.tamaño == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(hora string, fecha string) {
	if p.vacia() {
		nuevoN := &NodoPila{hora, fecha, p.Arriba}
		p.Arriba = nuevoN
		p.tamaño++
	} else {
		nuevoN := &NodoPila{hora, fecha, p.Arriba}
		p.Arriba = nuevoN
		p.tamaño++
	}

}

func (p *Pila) Pop() {
	if p.vacia() {
		fmt.Println("La pila está vacia")
	} else {
		p.Arriba = p.Arriba.siguient
		p.tamaño--
	}
}

func (p *Pila) MostrarPila() {
	if p.vacia() {
		fmt.Println("La pila está vacia")
	} else {
		fmt.Println(p.Arriba.Fecha)
		fmt.Println(p.Arriba.Hora)
	}
}
