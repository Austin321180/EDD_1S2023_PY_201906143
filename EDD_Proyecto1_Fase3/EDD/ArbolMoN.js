import { MatrizDispersa } from './Matriz.js';
class NodoArbolNario {
    constructor(valor, id) {
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
        this.hijos = [];
    }
}

export class ArbolNario {
    constructor() {
        this.raiz = new NodoArbolNario("/", 0)
        this.nodo_creados = 1
        this.mD = new MatrizDispersa()
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
                const excludedExtensions = ['txt', 'pdf', 'jpg', 'png', 'jpeg', 'txt_copia', 'pdf_copia', 'jpg_copia', 'png_copia', 'jpeg_copia', 'txt_copia1', 'pdf_copia1', 'jpg_copia1', 'png_copia1', 'jpeg_copia1'];
                const extension = aux.valor.split('.').pop();
                if (excludedExtensions.includes(extension)) {
                    aux = aux.siguiente;
                    continue;
                }
                cadena += "nodo" + aux.id + "[label=\"" + aux.valor + "\"] ";
                aux = aux.siguiente;
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

    conexionRamas(raiz, padre) {
        let cadena = ""
        let aux = raiz
        if (aux !== null) {
            while (aux) {
                const excludedExtensions = ['txt', 'pdf', 'jpg', 'png', 'jpeg', 'txt_copia', 'pdf_copia', 'jpg_copia', 'png_copia', 'jpeg_copia', 'txt_copia1', 'pdf_copia1', 'jpg_copia1', 'png_copia1', 'jpeg_copia1'];
                const extension = aux.valor.split('.').pop();
                if (excludedExtensions.includes(extension)) {
                    aux = aux.siguiente;
                    continue;
                }
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
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear();
        const hora = fechaActual.getHours().toString().padStart(2, '0');
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
        const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

        return {
            fecha: `${dia}/${mes}/${anio}`,
            hora: `${hora}:${minutos}:${segundos}`
        };
    }

    buscaCarpetaRecursiva(actual, nivelActual, listaCarpeta) {
        if (actual.valor === listaCarpeta[nivelActual]) {
            if (nivelActual === listaCarpeta.length - 1) {
                return actual;
            } else if (actual.primero !== null) {
                return this.buscaCarpetaRecursiva(actual.primero, nivelActual + 1, listaCarpeta);
            }
        }
        if (actual.siguiente !== null) {
            return this.buscaCarpetaRecursiva(actual.siguiente, nivelActual, listaCarpeta);
        }
        return null;
    }

    Buscrcarpeta2(listaCarpeta) {
        if (listaCarpeta[1] === "" && this.raiz.primero !== null) {
            return this.raiz;
        } else if (listaCarpeta[1] === "" && this.raiz.primero === null) {
            return null;
        } else if (listaCarpeta[1] !== "" && this.raiz.primero === null) {
            return null;
        } else if (listaCarpeta[1] !== "" && this.raiz.primero !== null) {
            return this.buscaCarpetaRecursiva(this.raiz.primero, 1, listaCarpeta);
        }
    }


    mostrarCarpeta(ruta) {
        let cadena = ""
        let lista_carpeta = ruta.split('/')
        if (this.Buscrcarpeta2(lista_carpeta) === null) {
            alert("La ruta no existe");
            return;
        }
        let existe = this.Buscrcarpeta2(lista_carpeta)
        cadena += "digraph G{"
        try {
            if (existe !== null) {
                let actual = existe.primero
                while (actual) {
                    const excludedExtensions = ['txt', 'pdf', 'jpg', 'png', 'jpeg', 'txt_copia', 'pdf_copia', 'jpg_copia', 'png_copia', 'jpeg_copia', 'txt_copia1', 'pdf_copia1', 'jpg_copia1', 'png_copia1', 'jpeg_copia1'];
                    const extension = actual.valor.split('.').pop();
                    if (excludedExtensions.includes(extension)) {
                        cadena += `"${actual.valor}" [shape=note];`;
                    } else {
                        cadena += `"${actual.valor}" [shape=folder];`;
                    }
                    console.log(actual.valor)
                    actual = actual.siguiente
                }
            }
        } catch (error) {
            console.log("ocurrio un error")
        }
        cadena += '}';
        return cadena
    }

    mostrarRuta(carpeta) {
        let traer = this.buscarRuta(thi.raiz, carpeta);
        if (traer === null) {
            console.log("no existe el archivo");
            return;
        }
    }

    buscarRuta(actual, archivo) {
        if (actual.id === archivo) {
            return actual.valor;
        } else if (actual.primero !== null) {
            let resultado = this.buscarRuta(actual.primero, archivo);
            if (resultado !== null) {
                return resultado
            }
        }
        if(actual.siguiente!==null){
            return this.buscarRuta(actual.siguiente,archivo);
        }
        return null;
    }

    eliminarCarpetaRecursiva(actual, nombreCarpetaAEliminar) {
        if (actual.primero) {
            this.eliminarCarpetaRecursiva(actual.primero, nombreCarpetaAEliminar);
        }
        if (actual.siguiente) {
            this.eliminarCarpetaRecursiva(actual.siguiente, nombreCarpetaAEliminar);
        }
        if (actual.nombre === nombreCarpetaAEliminar) {
            actual = null;
        }
    }

    eliminarCarpeta(ruta) {
        if (ruta === '/') {
            this.eliminarCarpetaRecursiva(this.raiz.primero);
            this.raiz.primero = null;
            return;
        }
        let lista_carpeta = ruta.split('/');
        let nombre_carpeta = lista_carpeta.pop();
        let carpeta = this.buscaCarpetaRecursiva(this.raiz.primero, 1, lista_carpeta);
        if (carpeta && carpeta.primero) {
            this.eliminarCarpetaRecursiva(carpeta.primero, nombre_carpeta);
        }
        carpeta.primero = null;
        carpeta = null;
    }

}