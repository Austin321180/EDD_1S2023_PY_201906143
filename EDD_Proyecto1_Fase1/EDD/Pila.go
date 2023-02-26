package edd

import (
	"fmt"
)

type NodoPila struct {
	Hora     string
	Fecha    string
	Estado   bool
	siguient *NodoPila
}

type Pila struct {
	Arriba *NodoPila
	tamaño int
	estado bool
}

func (p *Pila) vacia() bool {
	if p.tamaño == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(hora string, fecha string, estado bool) {
	if p.vacia() {
		nuevoN := &NodoPila{hora, fecha, estado, nil}
		p.Arriba = nuevoN
		p.tamaño++
	} else {
		nuevoN := &NodoPila{hora, fecha, estado, p.Arriba}
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

func (p *Pila) Aceptado() {
	if p.vacia() {
		fmt.Println("La pila esta vacia")
		return
	}
	p.Arriba.Estado = true
	p.estado = true
}

func (p *Pila) Rechazado() {
	if p.vacia() {
		fmt.Println("La pila esta vacia")
		return
	}
	p.Arriba.Estado = false
	p.estado = true
}

func (p *Pila) GrafP(estado bool) {
	nombre_archivo := "./pila.dot"
	nombre_imagen := "pila.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record, style = solid, color = green, fillcolor = palegreen, fontname=\"Arial\"];\n"
	aux := p.Arriba
	texto += "nodo0 [label=\""
	for i := 0; i < p.tamaño; i++ {
		if p.vacia() {
			texto = texto + ""
		} else {
			if aux.Estado {
				texto = texto + "|Se Acepto estudiante: " + " En la hora: " + aux.Hora + " En la fecha: " + aux.Fecha
			} else {
				texto = texto + "|Se Rechazo estudiante: " + " En la hora: " + aux.Hora + " En la fecha: " + aux.Fecha
			}
			aux = aux.siguient
		}
	}
	texto += "\"]; \n}"
	crearArch(nombre_archivo)
	escribirArch(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
