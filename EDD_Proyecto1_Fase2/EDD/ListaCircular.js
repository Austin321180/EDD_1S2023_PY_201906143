class NodoListaCircular {
    constructor(fecha, hora, texto) {
        this.fecha = fecha
        this.hora = hora
        this.texto = texto
        this.siguiente = null
    }
}

class ListaCircular {
    constructor() {
        this.inicio = null
        this.final = null
        this.tamaño = 0
    }

    AgregarValor(fecha, hora, texto) {
        const nuevoN = new NodoListaCircular(fecha, hora, texto)
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

    graficarlista() {
        let cadena = "digraph LinkedList {"
        cadena += "rankdir=TB;"
        cadena += "node [shape=box, style=filled, fillcolor=palegreen];"

        let actual = this.inicio
        for (let i = 0; i < this.tamaño; i++) {
            if (actual !== null) {
                cadena += "nodo" + i.toString() + " ["
                cadena += "label=\"" + "Fecha: " + actual.fecha + "\\n" + "Hora: " + actual.hora + "\\n" + "Acción: " + actual.texto + "\"];"
                if (actual.siguiente === null && this.tamaño > 1) {
                    cadena += "nodo" + i.toString() + "-> nodo0;"
                }
                actual = actual.siguiente
            }
        }

        for (let i = 0; i < this.tamaño - 1; i++) {
            let c = i + 1
            cadena += "nodo" + i.toString() + "-> nodo" + c.toString() + ";"
        }
        cadena += "nodo" + (this.tamaño - 1).toString() + "->nodo0;"
        cadena += "{rank=same;"
        for (let i = 0; i < this.tamaño; i++) {
            cadena += "nodo" + i.toString() + ";"
        }
        cadena += "}"

        cadena += "}"
        return cadena
    }
}

const Lcircular = new ListaCircular()

function refrescarlistacircular() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = Lcircular.graficarlista();
    $("#image2").attr("src", url + body);
    //document.getElementById("carpeta").value = "";
    console.log(url + body)
}