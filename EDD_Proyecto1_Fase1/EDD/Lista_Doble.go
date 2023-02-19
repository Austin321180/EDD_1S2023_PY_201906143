package edd

import "fmt"

type AlumnosAceptados struct {
	carnet     int
	nombre     string
	contraseña string
}

type Nodo_Doble struct {
	alumno    *AlumnosAceptados
	siguiente *Nodo_Doble
	anterior  *Nodo_Doble
}

type Lista_Doble struct {
	tamaño int
	inicio *Nodo_Doble
	final  *Nodo_Doble
	pila   *Nodo_Doble
}

func (l *Lista_Doble) vacia() bool {
	if l.tamaño == 0 {
		return true
	} else {
		return false
	}
}

func (l *Lista_Doble) nuevoN(alumno *AlumnosAceptados) *Nodo_Doble {
	return &Nodo_Doble{alumno, nil, nil}
}

func (l *Lista_Doble) Agregar(carnet int, nombre string, contraseña string) {
	nuevo := &AlumnosAceptados{carnet, nombre, contraseña}
	if l.vacia() {
		nueN := l.nuevoN(nuevo)
		l.inicio = nueN
		l.final = nueN
		l.tamaño++
	} else {
		nueN := l.nuevoN(nuevo)
		if l.final.anterior == nil {
			nueN.anterior = l.inicio
			l.inicio.siguiente = nueN
			l.final = nueN
		} else {
			l.final.siguiente = nueN
			nueN.anterior = l.final
			l.final = nueN
		}
		l.tamaño++
	}
}

func (l *Lista_Doble) MostrarDatos() {
	temp := l.inicio
	for temp != nil {
		fmt.Println(l.inicio.alumno.carnet, l.inicio.alumno.nombre, l.inicio.alumno.carnet, l.tamaño)
		temp = temp.siguiente
	}
}
