package edd

import (
	"fmt"
	"strconv"
)

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
	if l.vacia() {
		fmt.Println("Lista doble vacia")
	} else {
		temp := l.inicio
		for temp != nil {
			fmt.Println(l.inicio.alumno.carnet, l.inicio.alumno.nombre, l.inicio.alumno.contraseña)
			temp = temp.siguiente
		}
	}
}

func (l *Lista_Doble) Ingresar(user int, pass string) bool {
	nodo := l.inicio
	for nodo != nil {
		if nodo.alumno.carnet == user && nodo.alumno.contraseña == pass {
			return true
		}
		nodo = nodo.siguiente
	}
	return false
}

func (l *Lista_Doble) GrafLD() {
	nombre_archivo := "./listadoble.dot"
	nombre_imagen := "listadoble.jpg"
	texto := "digraph listadoble{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull[label=\"null\"];\n"
	aux := l.inicio
	contador := 0
	for i := 0; i < l.tamaño; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + " ["
		texto = texto + "label = \"{" + strconv.Itoa(aux.alumno.carnet) + " " + aux.alumno.nombre + "}\"];\n"
		aux = aux.siguiente
	}

	for i := 0; i < l.tamaño-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "-> nodo" + strconv.Itoa(c) + ";\n"
		texto += "nodo" + strconv.Itoa(c) + "-> nodo" + strconv.Itoa(i) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull;\n"
	texto += "}"
	crearArch(nombre_archivo)
	escribirArch(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func (l *Lista_Doble) Graf_Json() {
	nombre_json := "Alumnos.json"
	texto := "{\n"
	texto += "\t\"Alumnos\": [\n"
	aux := l.inicio
	for i := 0; i < l.tamaño; i++ {
		texto = texto + "\t\t{\n"
		texto = texto + "\t\t\t\"nombre\": \"" + aux.alumno.nombre + "\",\n"
		texto = texto + "\t\t\t\"carnet\": " + strconv.Itoa(aux.alumno.carnet) + ",\n"
		texto = texto + "\t\t\t\"password\": \"" + aux.alumno.contraseña + "\",\n"
		texto = texto + "\t\t\t\"Carpeta_Raiz\": \"/\"\n"
		texto = texto + "\t\t}"
		if aux.siguiente != nil {
			texto = texto + ",\n"
		} else {
			texto = texto + "\n"
		}
		aux = aux.siguiente
	}
	texto += "\t]\n"
	texto += "}"
	crearArch(nombre_json)
	escribirArch(texto, nombre_json)
}
