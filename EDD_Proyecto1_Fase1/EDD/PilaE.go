package edd

type NodoPilaE struct {
	fechaE    string
	horaE     string
	siguiente *NodoPilaE
}

type PilaE struct {
	primero *NodoPilaE
	tamaño  int
}

func (p *PilaE) vacia() bool {
	if p.tamaño == 0 {
		return true
	} else {
		return false
	}
}

func (p *PilaE) PushE(fecha string, hora string) {
	if p.vacia() {
		nuevoNod := &NodoPilaE{fecha, hora, nil}
		p.primero = nuevoNod
		p.tamaño++
	} else {
		nuevoNod := &NodoPilaE{fecha, hora, p.primero}
		p.primero = nuevoNod
		p.tamaño++
	}
}
