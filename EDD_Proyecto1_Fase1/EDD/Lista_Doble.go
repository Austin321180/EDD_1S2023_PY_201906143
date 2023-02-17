package edd

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

func (l *Lista_Doble) Insertar_Final(carnet int, nombre string, contraseña string) {
	nuevo := &AlumnosAceptados{carnet, nombre, contraseña}
	if l.vacia() {
		l.inicio = l.nuevoN(nuevo)
		l.tamaño++
	} else {
		temp := l.inicio
		for temp.siguiente != nil {
			temp = temp.siguiente
		}
		temp.siguiente = l.nuevoN(nuevo)
		temp.siguiente.anterior = temp
		l.tamaño++
	}
}

func (l *Lista_Doble) MostrarDatos() {
	temp := l.inicio
	for temp != nil {

	}
}
