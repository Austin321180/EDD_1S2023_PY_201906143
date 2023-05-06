class nodolista {
    constructor(bloques, fecha, emisor, receptor, mensaje, hash, hash2, desencriptado) {
        this.valor = {
            'index': bloques,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': hash,
            'hash': hash2,
            'desencriptado': desencriptado
        }
        this.siguiente = null
        this.anterior = null
    }
}

class ListaEnlazada {
    constructor() {
        this.inicio = null
    }

    insertardatos(bloques, fecha, emisor, receptor, mensaje, hash, hash2, desencriptado) {
        if (this.inicio === null) {
            const nuevoNodo = new nodolista(bloques, fecha, emisor, receptor, mensaje, hash, hash2, desencriptado)
            this.inicio = nuevoNodo
        } else {
            let aux = this.inicio
            while (aux.siguiente) {
                aux = aux.siguiente
            }
            const nuevoNodo = new nodolista(bloques, fecha, emisor, receptor, mensaje, hash, hash2, desencriptado)
            nuevoNodo.anterior = aux
            aux.siguiente = nuevoNodo
        }
    }

    graficar() {
        let cadena = 'digraph G{'
        cadena += 'rankdir=TB;'
        cadena += "node [shape=box, style=filled, fillcolor=palegreen];"
        let aux = this.inicio
        let contador = 0
        while (aux !== null) {
            cadena += "nodo" + contador + "["
            cadena += `label=\"TimeStamp: ${aux.valor['timestamp']}\\nEmisor: ${aux.valor['transmitter']}\\nReceptor: ${aux.valor['receiver']}\\nPreviushash: ${aux.valor['previoushash']}\"`
            cadena += "];"
            if (aux.siguiente !== null) {
                cadena += "nodo" + contador + " -> " + "nodo" + (contador + 1) + ";"
            }
            contador++;
            aux = aux.siguiente
        }
        cadena += '}'
        return cadena
    }
}

export { ListaEnlazada }