const inputElement = document.getElementById("inputFile");
let nombreArchivo = ""
let base64String = ""
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    nombreArchivo = event.target.files[0].name
    reader.readAsDataURL(event.target.files[0]);
}

function onReaderLoad(event) {
    base64String = event.target.result
}

class NodoMatriz {
    constructor(Posx, Posy, nombre) {
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.Posx = Posx;
        this.Posy = Posy;
        this.posicion = nombre;
    }
}

export class MatrizDispersa {
    constructor() {
        this.principal = new NodoMatriz(-1, -1, "Raiz")
        this.coordenadasY = 0
        this.coordenadasX = 0
    }

    BuscarFila(nombre) {
        let aux = this.principal
        while (aux) {
            if (aux.posicion === nombre) {
                return aux
            } else {
                aux = aux.abajo
            }
        }
        return null
    }

    BuscarColumna(carnet) {
        let aux = this.principal
        while (aux) {
            if (aux.posicion === carnet) {
                return aux
            } else {
                aux = aux.siguiente
            }
        }
        return null
    }

    InsertarColumna(posicion, dato) {
        const nuevoN = new NodoMatriz(posicion, -1, dato)
        let pivote = this.principal
        let pivoteA = this.principal
        while (pivote.siguiente) {
            if (nuevoN.Posx > pivote.Posx) {
                pivoteA = pivote
                pivote = pivote.siguiente
            } else {
                nuevoN.siguiente = pivote
                nuevoN.anterior = pivoteA
                pivoteA.siguiente = nuevoN
                pivote.anterior = nuevoN
                return;
            }
        }
        nuevoN.anterior = pivote
        pivote.siguiente = nuevoN
    }

    InsertarFila(posicion, dato) {
        const nuevoN = new NodoMatriz(-1, posicion, dato)
        let pivote = this.principal
        let pivoteA = this.principal
        while (pivote.abajo) {
            if (nuevoN.Posy > pivote.Posy) {
                pivoteA = pivote
                pivote = pivote.abajo
            } else {
                nuevoN.abajo = pivote
                nuevoN.anterior = pivoteA
                pivoteA.abajo = nuevoN
                pivote.arriba = nuevoN
                return;
            }
        }
        nuevoN.arriba = pivote
        pivote.abajo = nuevoN
    }

    InsertarNodo(x, y, dato) {
        const nuevoN = new NodoMatriz(x, y, dato)
        let temporalx = this.principal
        let temporaly = this.principal
        while (temporalx.siguiente) {
            if (temporalx.Posx === nuevoN.Posx) {
                break
            }
            temporalx = temporalx.siguiente
        }
        while (true) {
            if (temporalx.Posy === nuevoN.Posy) {
                break
            } else if (temporalx.abajo !== null && temporalx.abajo.Posy > nuevoN.Posy) {
                nuevoN.abajo = temporalx.abajo
                nuevoN.arriba = temporalx
                temporalx.abajo = nuevoN
                break
            } else if (temporalx.abajo === null) {
                nuevoN.arriba = temporalx
                nuevoN.abajo = temporalx.abajo
                temporalx.abajo = nuevoN
                break
            } else {
                temporalx = temporalx.abajo
            }
        }
        while (temporaly.abajo) {
            if (temporaly.Posy === nuevoN.Posy) {
                break
            }
            temporaly = temporaly.abajo
        }
        while (true) {
            if (temporaly.Posx === nuevoN.Posx) {
                break
            } else if (temporaly.siguiente !== null && temporaly.siguiente.Posx > nuevoN.Posx) {
                nuevoN.siguiente = temporaly.siguiente
                nuevoN.anterior = temporaly
                temporaly.siguiente = nuevoN
            } else if (temporaly.siguiente === null) {
                nuevoN.anterior = temporaly
                nuevoN.siguiente = temporaly.siguiente
                temporaly.siguiente = nuevoN
            } else {
                temporaly = temporaly.siguiente
            }
        }
    }

    InsertarElemento(x, y) {
        let dato = x + "," + y
        let nuevaFila = this.BuscarFila(y)
        let nuevaColumna = this.BuscarColumna(x)
        if (nuevaFila === null && nuevaColumna === null) {
            this.InsertarColumna(x, "C" + x)
            this.InsertarFila(y, "F" + y)
            this.InsertarNodo(x, y, dato)
        } else if (nuevaFila === null && nuevaColumna !== null) {
            this.InsertarFila(y, "F" + y)
            this.InsertarNodo(x, y, dato)
        } else if (nuevaFila !== null && nuevaColumna === null) {
            this.InsertarColumna(x, "C" + x)
            this.InsertarNodo(x, y, dato)
        } else if (nuevaFila !== null && nuevaColumna !== null) {
            this.InsertarNodo(x, y, dato)
        }
    }

    InsertarArchivo(texto, numero) {
        let nuevafila = this.BuscarFila(texto)
        if (nuevafila === null) {
            this.InsertarFila(this.coordenadasY, texto)
            this.coordenadasY++
        } else {
            let copia = nombreArchivo + "(" + (numero++) + ")"
            this.InsertarArchivo(copia, numero)
        }
    }

    Permisos(archivo, carnet, permisos) {
        let nuevaColumna = this.BuscarColumna(carnet)
        let nuevafila = this.BuscarFila(archivo)
        if (nuevaColumna === null) {
            this.InsertarColumna(this.coordenadasX, carnet)
            this.coordenadasX++
            nuevaColumna = this.BuscarColumna(carnet)
        }
        if (nuevaColumna !== null && nuevafila !== null) {
            this.InsertarNodo(nuevaColumna.Posx, nuevafila.Posy, permisos)
        }
    }

    reporte() {
        let cadena = ""
        let aux1 = this.principal
        let aux2 = this.principal
        let aux3 = this.principal
        if (aux1 !== null) {
            cadena = "digraph MatrizCapa{ \n node[shape=box] \n rankdir=UD; \n {rank=min; \n";
            /** Creacion de los nodos actuales */
            while (aux1) {
                cadena += "nodo" + (aux1.Posx + 1) + (aux1.Posy + 1) + "[label=\"" + aux1.posicion + "\" ,rankdir=LR,group=" + (aux1.Posx + 1) + "]; \n";
                aux1 = aux1.siguiente;
            }
            cadena += "}"
            while (aux2) {
                aux1 = aux2;
                cadena += "{rank=same; \n";
                while (aux1) {
                    cadena += "nodo" + (aux1.Posx + 1) + (aux1.Posy + 1) + "[label=\"" + aux1.posicion + "\" ,group=" + (aux1.Posx + 1) + "]; \n";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.siguiente) {
                    cadena += "nodo" + (aux1.Posx + 1) + (aux1.Posy + 1) + " -> " + "nodo" + (aux1.siguiente.Posx + 1) + (aux1.siguiente.Posy + 1) + " [dir=both];\n"
                    aux1 = aux1.siguiente
                }
                aux2 = aux2.abajo;
            }
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.abajo) {
                    cadena += "nodo" + (aux1.Posx + 1) + (aux1.Posy + 1) + " -> " + "nodo" + (aux1.abajo.Posx + 1) + (aux1.abajo.Posy + 1) + " [dir=both];\n"
                    aux1 = aux1.abajo
                }
                aux2 = aux2.siguiente;
            }
            cadena += "}";
        } else {
            cadena = "No hay elementos en la matriz"
        }
        return cadena;
    }
}

