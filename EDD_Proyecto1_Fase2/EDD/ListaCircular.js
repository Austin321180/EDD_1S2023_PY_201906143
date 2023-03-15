class NodoListaCircular {
    constructor(valor) {
        this.valor = valor
        this.siguiente = null
    }
}

class ListaCircular {
    constructor() {
        this.inicio = null
        this.final = null
        this.tamaño = 0
    }

    AgregarValor(valor) {
        const nuevoN = new NodoListaCircular(valor)
        if (!this.inicio) {
            this.inicio = nuevoN
            this.final = nuevoN
            nuevoN.siguiente = this.inicio
        } else {
            this.final.siguiente = nuevoN
            this.final = nuevoN
            nuevoN.siguiente = this.inicio
        }
        this.tamaño++
    }

    EliminarPrimero(valor) {
        let actual = this.inicio
        let anterior = null
        while (actual) {
            if (actual.valor === valor) {
                if (actual === this.inicio) {
                    this.inicio = this.inicio.siguiente
                    this.final.siguiente = this.inicio
                } else if (actual === this.final) {
                    this.final = anterior
                    this.final.siguiente = this.inicio
                } else {
                    anterior.siguiente = actual.siguiente
                }
                this.tamaño--
                return true
            }
            anterior = actual
            actual = actual.siguiente
        }
        return false
    }

    ObtenerPrimero() {
        return this.inicio.valor
    }

    ObtenerUltimo() {
        if (!this.inicio) {
            return null
        }
        let nodo = this.inicio
        while (nodo) {
            if (!nodo.siguiente) {
                return nodo
            }
            nodo.siguiente
        }
    }

    ObtenerUno(dato) {
        let contador = 0
        let nodo = this.inicio
        while (nodo) {
            if (contador === dato) {
                return nodo
            }
            contador++
            nodo = nodo.siguiente
        }
        return null

    }
}