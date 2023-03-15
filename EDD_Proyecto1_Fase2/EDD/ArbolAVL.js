class NodoArbolAVL {
    constructor(nombre, valor, password, carpetaRaiz) {
        this.izquierdo = null
        this.derecho = null
        this.valor = valor
        this.nombre = nombre
        this.password = password
        this.carpetaRaiz = carpetaRaiz
    }
}

class ArbolAVL {
    constructor() {
        this.raiz = null
    }

    InsertarNodoArbolAVL(nodo, raiz) {
        if (raiz === null) {
            raiz = nodo
        } else {
            if (raiz.valor === nodo.valor) {
                return raiz
            } else if (raiz.valor < nodo.valor) {
                raiz.derecho = this.InsertarNodoArbolAVL(nodo, raiz.derecho)
            } else {
                raiz.izquierdo = this.InsertarNodoArbolAVL(nodo, raiz.izquierdo)
            }
            console.log(raiz.nombre + " " + raiz.valor)
        }
        return raiz
    }

    InsertarDatos(nombre, valor, password, carpetaRaiz) {
        const nuevoN = new NodoArbolAVL(nombre, valor, password, carpetaRaiz)
        this.raiz = this.InsertarNodoArbolAVL(nuevoN, this.raiz)
    }


    RecorridoPreorden(raiz) {
        let cadena = ""
        if (raiz !== null) {
            cadena = cadena + "\""
            cadena = cadena + raiz.valor
            cadena = cadena + "\""
            if (raiz.izquierdo !== null) {
                cadena = cadena + " -> "
                cadena = cadena + this.recorridoPreorden(raiz.izquierdo)
            }
            if (raiz.derecho !== null) {
                cadena = cadena + " -> "
                cadena = cadena + this.recorridoPreorden(raiz.derecho)
            }
        }
        return cadena
    }

    RecorridoInorden(raiz) {
        let cadena = ""
        if (raiz !== null) {
            if (raiz.izquierdo !== null) {
                cadena += this.recorridoInorden(raiz.izquierdo)
                cadena += " -> "
            }
            cadena += "\""
            cadena += raiz.valor
            cadena += "\""
            if (raiz.derecho !== null) {
                cadena += " -> "
                cadena += this.recorridoInorden(raiz.derecho)
            }
        }
        return cadena
    }

    RecorridoPostOrden(raiz) {
        let cadena = ""
        if (raiz !== null) {
            if (raiz.izquierdo !== null) {
                cadena += this.recorridoPostOrden(raiz.izquierdo)
                cadena += " -> "
            }
            if (raiz.derecho !== null) {
                cadena += this.recorridoPostOrden(raiz.derecho)
                cadena += " -> "
            }
            cadena += "\""
            cadena += raiz.valor
            cadena += "\""
        }
        return cadena
    }

    RecorridoArbol() {
        console.log(this.recorridoInorden(this.raiz))
        console.log(this.recorridoPreOrden(this.raiz))
        console.log(this.recorridoPostOrden(this.raiz))
    }

    ValoresArbol(raiz, id) {
        let cadena = ""
        let numero = id + 1
        if (raiz !== null) {
            cadena += "\"";
            cadena += raiz.valor;
            cadena += "\" ;";
            if (!(raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + "\"" + raiz.izquierdo.valor + "\"" + " -> " + "\"" + raiz.derecho.valor + "\"" + " [style=invis]}; "
            } else if (!(raiz.izquierdo === null) && (raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "{rank=same" + "\"" + raiz.izquierdo.valor + "\"" + " -> " + "x" + numero + " [style=invis]}; "
            } else if ((raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "; \"";
                cadena += raiz.valor;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.valor + "\"" + " [style=invis]}; "
            }
        }
        return cadena
    }

    TablaArbol(raiz) {
        let cadena = ""
        if (raiz !== null) {
            if (!(raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += "<tr><td>" + raiz.valor + "</td><td>" + raiz.nombre + "</td></tr>"
                cadena += this.TablaArbol(raiz.izquierdo)
                cadena += this.TablaArbol(raiz.derecho)
            } else if (!(raiz.izquierdo === null) && (raiz.derecho === null)) {
                cadena += "<tr><td>" + raiz.valor + "</td><td>" + raiz.nombre + "</td></tr>"
                cadena += this.TablaArbol(raiz.izquierdo)
            } else if ((raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += "<tr><td>" + raiz.valor + "</td><td>" + raiz.nombre + "</td></tr>"
                cadena += this.TablaArbol(raiz.derecho)
            }
        }
        return cadena
    }

    GraficarArbol() {
        let cadena = ""
        if (this.raiz !== null) {
            cadena += "digraph arbol {"
            cadena += "node [shape=circle];"
            cadena += this.ValoresArbol(this.raiz, 0)
            cadena += "}"
        }
        return cadena
    }

    GraficarTabla() {
        let cadena = ""
        if (this.raiz !== null) {
            cadena += "digraph Tabla {"
            cadena += "node [shape=plaintext];"
            cadena += "TablaAlumnos[label=<<table border=\"1\" cellborder=\"1\" cellspacing=\"0\">"
            cadena += "<tr><td colspan=\"2\" bgcolor=\"green\"><b>Alumnos</b></td></tr>"
            cadena+="<tr><td bgcolor=\"green\"><b>Carnet</b></td><td bgcolor=\"green\"><b>Nombre</b></td></tr>"
            cadena += this.TablaArbol(this.raiz)
            cadena += "</table>>];"
            cadena += "}"
        }
        return cadena
    }

    RecorridosArbol() {
        console.log("Recorrido Pre-Orden")
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = "digraph G { graph[label = \"Pre-Orden\" rankdir = LR labelloc = t]" + this.recorridoPreorden(this.raiz) + "}";
        $("#image1").attr("src", url + body);
        console.log("Recorrido In-Orden")
        body = "digraph G { graph[label = \"In-Orden\" rankdir = LR labelloc = t]" + this.recorridoInorden(this.raiz) + "}";
        $("#image2").attr("src", url + body);
        console.log("Recorrido Post-Orden")
        body = "digraph G { graph[label = \"Post-Orden\" rankdir = LR labelloc = t]" + this.recorridoPostOrden(this.raiz) + "}";
        $("#image3").attr("src", url + body);
    }

    EliminarTodo() {
        this.raiz = null
    }



}

const treeAvl = new ArbolAVL();

function CargaJson() {
    const fileInput = document.getElementById('carga');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        console.log(json);
        json.alumnos.forEach((alumno) => {
            treeAvl.InsertarDatos(alumno.nombre, alumno.carnet, alumno.password, alumno.Carpeta_Raiz)
        });
    };
    reader.readAsText(file);
}

function refrescarTabla() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = treeAvl.GraficarTabla();
    $("#image").attr("src", url + body);
    document.getElementById("carga").value = "";
    console.log(url + body)
}

function refrecarArbol() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = treeAvl.GraficarArbol();
    $("#image1").attr("src", url + body);
    document.getElementById("carga").value = "";
    console.log(url + body)
}