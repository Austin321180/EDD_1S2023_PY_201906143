class NodoArbolNario {
    constructor(valor, id) {
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
        this.hijos = [];
    }
}

class ArbolNario {
    constructor() {
        this.raiz = new NodoArbolNario("/", 0)
        this.nodo_creados = 1
    }

    BuscarCarpeta(carpeta_nueva, lista_carpeta) {
        if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
            let aux = this.raiz.primero
            while (aux) {
                if (aux.valor === carpeta_nueva) {
                    return 1
                }
                aux = aux.siguiente
            }
            return 2
        }
        else if (lista_carpeta[1] === "" && this.raiz.primero === null) {
            return 5
        }
        else if (lista_carpeta[1] !== "" && this.raiz.primero === null) {
            return 3
        }
        else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1;
            for (var i = 1; i < nivel; i++) {
                if (aux !== null) {
                    while (aux) {
                        if (posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor) {
                            posicion++
                            if (aux.primero !== null && posicion < lista_carpeta.length) {
                                aux = aux.primero
                            }
                            break;
                        } else {
                            aux = aux.siguiente
                        }
                    }
                } else {
                    break;
                }
            }
            if (aux !== null) {
                aux = aux.primero
                while (aux) {
                    if (aux.valor === carpeta_nueva) {
                        return 1
                    }
                    aux = aux.siguiente
                }
                return 2
            } else {
                return 4
            }

        }
    }

    insertarOrdenado(raiz, nuevoNodo) {
        let piv = raiz.primero
        if (nuevoNodo.valor < raiz.primero.valor) {
            nuevoNodo.siguiente = raiz.primero
            raiz.primero = nuevoNodo
            return raiz
        } else {
            while (piv.siguiente) {
                if (nuevoNodo.valor > piv.valor && nuevoNodo.valor < piv.siguiente.valor) {
                    nuevoNodo.siguiente = piv.siguiente
                    piv.siguiente = nuevoNodo
                    return raiz
                } else if (nuevoNodo.valor < piv.valor) {
                    nuevoNodo.siguiente = piv
                    piv = nuevoNodo
                    return raiz
                } else {
                    piv = piv.siguiente
                }
            }
            piv.siguiente = nuevoNodo
            return raiz
        }
    }

    insertarHijos(carpeta_nueva, lista_carpeta) {
        const nuevoNodo = new NodoArbolNario(carpeta_nueva, this.nodo_creados)
        this.nodo_creados++
        if (lista_carpeta[1] === "" && this.raiz.primero === null) {
            this.raiz.primero = nuevoNodo
        }
        else if (lista_carpeta[1] === "" && this.raiz.primero !== null) {
            this.raiz = this.insertarOrdenado(this.raiz, nuevoNodo)
        }
        else if (lista_carpeta[1] !== "" && this.raiz.primero !== null) {
            let aux = this.raiz.primero
            let nivel = lista_carpeta.length
            let posicion = 1;
            for (var i = 1; i < nivel; i++) {
                if (aux !== null) {
                    while (aux) {
                        if (posicion < lista_carpeta.length && lista_carpeta[posicion] === aux.valor) {
                            posicion++
                            if (aux.primero !== null && posicion < lista_carpeta.length) {
                                aux = aux.primero
                            }
                            break;
                        } else {
                            aux = aux.siguiente
                        }
                    }
                } else {
                    break;
                }
            }
            if (aux.primero === null) {
                aux.primero = nuevoNodo
            } else {
                aux = this.insertarOrdenado(aux, nuevoNodo)
            }
            aux.hijos.push(nuevoNodo);
        }
    }

    insertarValor(ruta, carpeta_nueva) {
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)
        switch (existe_carpeta) {
            case 1:
                let nombre_carpeta_copia = `${carpeta_nueva}_copia`
                let i = 1
                while (this.BuscarCarpeta(nombre_carpeta_copia, lista_carpeta) === 1) {
                    nombre_carpeta_copia = `${carpeta_nueva}_copia${i}`
                    i++
                }
                this.insertarHijos(nombre_carpeta_copia, lista_carpeta)
                alert(`La carpeta ${carpeta_nueva} ya existe. Se ha creado una copia con el nombre ${nombre_carpeta_copia}.`)
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
            case 3:
                alert("La ruta actual no existe")
                break;
            case 4:
                alert("La ruta actual no es valida")
                break;
            case 5:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
        }
    }
    grafica_arbol() {
        var cadena = "";
        if (!(this.raiz === null)) {
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz);
            cadena = cadena + "}";
        } else {
            cadena = "digraph G { arbol }";
        }
        return cadena;
    }

    retornarValoresArbol(raiz) {
        var cadena = "node[shape=record] ";
        let nodo = 1;
        let nodo_padre = 0;
        cadena += "nodo" + nodo_padre + "[label=\"" + this.raiz.valor + "\"] "
        cadena += this.valoresSiguietes(this.raiz.primero, nodo, nodo_padre)
        cadena += this.conexionRamas(this.raiz.primero, 0)
        console.log(cadena)
        return cadena;
    }
    valoresSiguietes(raiz, nodo, nodo_padre) {
        let cadena = ""
        let aux = raiz
        let nodo_padre_aumento = nodo_padre
        if (aux !== null) {
            while (aux) {
                cadena += "nodo" + aux.id + "[label=\"" + aux.valor + "\"] "
                aux = aux.siguiente
            }
            aux = raiz
            while (aux) {
                nodo_padre_aumento++
                cadena += this.valoresSiguietes(aux.primero, this.nodo_creados, nodo_padre_aumento)
                aux = aux.siguiente
            }
        }
        return cadena
    }

    Archivos(raiz) {
        let cadena = ""
        if (raiz !== null) {
            cadena += "<TD bgcolor=\"yellow\" gradientangle=\"315\">Carpeta: " + raiz.valor + "</TD>"
            let hijo = raiz.primero;
            while (hijo !== null) {
                cadena += this.Archivos(hijo);
                hijo = hijo.siguiente;
            }
        }
        return cadena
    }

    GraficarArchivos() {
        let cadena = ""
        if (this.raiz !== null) {
            cadena += "digraph G {"
            cadena += "fontname=\"Helvetica,Arial,sans-serif\""
            cadena += "node [fontname=\"Helvetica,Arial,sans-serif\"]"
            cadena += "edge [fontname=\"Helvetica,Arial,sans-serif\"]"
            cadena += "a0 [shape=none label=<"
            cadena += "<TABLE border=\"0\" cellspacing=\"10\" cellpadding=\"10\">"
            cadena += "<TR>"
            cadena += this.Archivos(this.raiz)
            cadena += "</TR>"
            cadena += "</TABLE>>]"
            cadena += "}"
        }
        return cadena
    }

    obtenerFechaYHora() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();
        const hora = fechaActual.getHours();
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();

        return {
            fecha: `${dia}/${mes}/${anio}`,
            hora: `${hora}:${minutos}:${segundos}`
        };
    }

    conexionRamas(raiz, padre) {
        let cadena = ""
        let aux = raiz
        if (aux !== null) {
            while (aux) {
                cadena += "nodo" + padre + " -> nodo" + aux.id + " "
                aux = aux.siguiente
            }
            aux = raiz
            while (aux) {
                cadena += this.conexionRamas(aux.primero, aux.id)
                aux = aux.siguiente
            }
        }
        return cadena
    }
}
const arbolnario = new ArbolNario()
const listaCircular = new ListaCircular();
function agregarVarios() {
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
    try {
        arbolnario.insertarValor(ruta, carpeta)
    } catch (error) {
        alert("Hubo un error al insertar la carpeta")
    }
    document.getElementById("carpeta").value = "";
    //refrescarArbol();
    //refrecarArchivos();
    agregarCarpetaFechayHora()
}

function agregarCarpetaFechayHora() {
    let carpeta = document.getElementById("carpeta").value
    const fechaYHora = arbolnario.obtenerFechaYHora();
    try {
        listaCircular.AgregarValor(fechaYHora.fecha, fechaYHora.hora, " Se creo la carpeta: " + carpeta)
    } catch (error) {
        alert("Hubo un error al insertar la carpeta")
    }
    document.getElementById("carpeta").value = "";
}

function refrescarArbol() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolnario.grafica_arbol();
    $("#image").attr("src", url + body);
    document.getElementById("carpeta").value = "";
}

function refrecarArchivos() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolnario.GraficarArchivos();
    $("#image1").attr("src", url + body);
    document.getElementById("carpeta").value = "";
    console.log(url + body)
}

function Eliminar() {
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
    try {
        arbolnario.eliminarCarpeta(ruta)
    } catch (error) {
        alert("Hubo un error al insertar la carpeta")
    }
    document.getElementById("carpeta").value = "";
}