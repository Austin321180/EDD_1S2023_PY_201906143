package edd

import (
	"fmt"
	"strconv"
)

type AlumnosAceptados struct {
	Carnet     int
	Nombre     string
	contraseña string
}

type Nodo_Doble struct {
	Alumno    *AlumnosAceptados
	Siguiente *Nodo_Doble
	Anterior  *Nodo_Doble
	Bitacora  *PilaE
}

type Lista_Doble struct {
	tamaño int
	Inicio *Nodo_Doble
	Final  *Nodo_Doble
}

func (l *Lista_Doble) vacia() bool {
	if l.tamaño == 0 {
		return true
	} else {
		return false
	}
}

func (l *Lista_Doble) nuevoN(alumno *AlumnosAceptados) *Nodo_Doble {
	return &Nodo_Doble{alumno, nil, nil, &PilaE{primero: nil, tamaño: 0}}
}

func (l *Lista_Doble) Agregar(carnet int, nombre string, contraseña string) {
	if l.BuscarN(carnet) {
		fmt.Println("El carnet:", carnet, "ya existe en el sistema.")
	} else {
		nuevo := &AlumnosAceptados{carnet, nombre, contraseña}
		if l.vacia() {
			nueN := l.nuevoN(nuevo)
			l.Inicio = nueN
			l.Final = nueN
			l.tamaño++
		} else {
			actual := l.Inicio
			for actual != nil && actual.Alumno.Carnet < carnet {
				actual = actual.Siguiente
			}
			nueN := l.nuevoN(nuevo)
			if actual == nil {
				nueN.Anterior = l.Final
				l.Final.Siguiente = nueN
				l.Final = nueN
			} else if actual.Anterior == nil {
				nueN.Siguiente = l.Inicio
				l.Inicio = nueN
			} else {
				anter := actual.Anterior
				anter.Siguiente = nueN
				nueN.Anterior = anter
				nueN.Siguiente = actual
				actual.Anterior = nueN
			}
			l.tamaño++
		}
	}
}

func (l *Lista_Doble) MostrarDatos() {
	aux := l.Inicio
	if l.vacia() {
		fmt.Println("Lista doble vacia")
	} else {
		for aux != nil {
			fmt.Println("---------------------------------------------------------------------------------------")
			fmt.Println("Carnet:", aux.Alumno.Carnet, " Nombre:", aux.Alumno.Nombre, " Pila:", ValP(aux.Bitacora))
			fmt.Println("---------------------------------------------------------------------------------------")
			aux = aux.Siguiente
		}
	}
}

func (l *Lista_Doble) AgregarPila(carn int, fecha string, hora string) {
	if l.vacia() {
		fmt.Println("Pila vacia")
	} else {
		aux := l.Inicio
		for i := 0; i < l.tamaño; i++ {
			if carn == aux.Alumno.Carnet {
				aux.Bitacora.PushE(fecha, hora)
			}
			aux = aux.Siguiente
		}
	}
}

func (l *Lista_Doble) iniciarSesion(carnet int, password string) string {
	alumno := l.Ingresar(carnet, password)
	if alumno == nil {
		fmt.Println("error")
	}
	return alumno.Nombre
}

func ValP(p *PilaE) string {
	texto := ""
	aux := p.primero
	if aux != nil {
		for aux != nil {
			texto += "Fecha: " + aux.fechaE + " Hora: " + aux.horaE + " "
			aux = aux.siguiente
		}
	} else {
		texto = ""
	}
	return texto
}

func (l *Lista_Doble) BuscarN(carnet int) bool {
	nodo := l.Inicio  //entro como el primer valor
	for nodo != nil { //verifico que no este vacio
		if nodo.Alumno.Carnet == carnet { //como no esta vacio compara el valor por carnet
			return true //si es igual entonces retorna true
		}
		nodo = nodo.Siguiente //pasa al siguiente
	}
	return false //sino está retorna false
}

func (l *Lista_Doble) Ingresar(user int, pass string) *AlumnosAceptados {
	nodo := l.Inicio
	for nodo != nil {
		if nodo.Alumno.Carnet == user && nodo.Alumno.contraseña == pass {
			return nodo.Alumno
		}
		nodo = nodo.Siguiente
	}
	return nil
}

func (l *Lista_Doble) GrafLD() {
	nombre_archivo := "./listadoble.dot"
	nombre_imagen := "listadoble.jpg"
	texto := "digraph LinkedList {\n"
	texto += "rankdir=TB;\n"
	texto += "node [shape=box, style=filled, fillcolor=palegreen];\n"
	aux := l.Inicio
	for i := 0; i < l.tamaño; i++ {
		if aux != nil {
			texto = texto + "nodo" + strconv.Itoa(i) + " ["
			texto = texto + "label = \"" + aux.Alumno.Nombre + " " + strconv.Itoa(aux.Alumno.Carnet) + ""
			auxBitacora := aux.Bitacora.primero
			texto = texto + "\"];\n"
			texto = texto + "n" + strconv.Itoa(i) + " [ shape= record, label=\"{"
			for j := 0; j < aux.Bitacora.tamaño; j++ {
				texto = texto + "| Fecha: " + auxBitacora.fechaE + "\\nHora: " + auxBitacora.horaE + ""
				auxBitacora = auxBitacora.siguiente
			}
			texto = texto + "}\"];\n"
			aux = aux.Siguiente
		}
	}
	for i := 0; i < l.tamaño-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "-> nodo" + strconv.Itoa(c) + ";\n"
		texto += "nodo" + strconv.Itoa(c) + "-> nodo" + strconv.Itoa(i) + ";\n"
	}
	for i := 0; i < l.tamaño; i++ {
		texto += "nodo" + strconv.Itoa(i) + "-> n" + strconv.Itoa(i) + ";\n"
	}
	texto += "{rank=same;"
	for i := 0; i < l.tamaño; i++ {
		texto += "nodo" + strconv.Itoa(i) + ";"
	}
	texto += "}\n"
	texto += "}"
	crearArch(nombre_archivo)
	escribirArch(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func (l *Lista_Doble) Graf_Json() {
	nombre_json := "Alumnos.json"
	texto := "{\n"
	texto += "\t\"Alumnos\": [\n"
	aux := l.Inicio
	for i := 0; i < l.tamaño; i++ {
		if aux != nil {
			texto = texto + "\t\t{\n"
			texto = texto + "\t\t\t\"nombre\": \"" + aux.Alumno.Nombre + "\",\n"
			texto = texto + "\t\t\t\"carnet\": " + strconv.Itoa(aux.Alumno.Carnet) + ",\n"
			texto = texto + "\t\t\t\"password\": \"" + aux.Alumno.contraseña + "\",\n"
			texto = texto + "\t\t\t\"Carpeta_Raiz\": \"/\"\n"
			texto = texto + "\t\t}"
			if aux.Siguiente != nil {
				texto = texto + ",\n"
			} else {
				texto = texto + "\n"
			}
			aux = aux.Siguiente
		}
	}
	texto += "\t]\n"
	texto += "}"
	crearArch(nombre_json)
	escribirArch(texto, nombre_json)
}
