class NodoArbolNario {
    constructor(valor) {
        this.valor = valor
        this.hijo = []
    }

    AñadirHijo(nodo) {
        this.hijo.push(nodo)
    }
}

class ArbolNario {
    constructor(valor) {
        this.root = new NodoArbolNario(valor)
    }

    AtrabesarArbol(nodo, llamar) {
        llamar(nodo)
        for (let i = 0; i < nodo.AñadirHijo.length; i++) {
            this.AtrabesarArbol(nodo.AñadirHijo[i], llamar)
        }
    }
}