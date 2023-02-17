package edd

import "fmt"

type Datos struct {
	hora  string
	fecha string
}

type NodoPila struct {
	Hora      string
	Fecha     string
	siguiente *NodoPila
}

type Pila struct {
	Arriba *NodoPila
	tamaño int
}

func (p *Pila) Push(hora string, fecha string) {
	p.Arriba = &NodoPila{hora, fecha, p.Arriba}
	p.tamaño++
}

func (p *Pila) Pop() {
	p.Arriba = p.Arriba.siguiente
	p.tamaño--
}

func (p *Pila) MostrarPila() {
	fmt.Println(p.Arriba.Fecha)
	fmt.Println(p.Arriba.Hora)
}
