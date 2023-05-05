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
        let cadena = ''
        return cadena
    }
}

export { ListaEnlazada }