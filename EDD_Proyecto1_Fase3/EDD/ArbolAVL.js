import { ListaCircular } from './ListaCircular.js';
import { ArbolNario } from './ArbolMoN.js';
class NodoArbolAVL {
    constructor(nombre, valor, password, carpetaRaiz) {
        this.izquierdo = null
        this.derecho = null
        this.valor = valor
        this.nombre = nombre
        this.altura = 1
        this.password = password
        this.carpetaRaiz = carpetaRaiz
        this.factor_equilibrio = 0
    }
}

export class ArbolAVL {
    constructor() {
        this.raiz = null
        this.arbol_nario = new ArbolNario()
        this.lcirc = new ListaCircular()
    }

    Altura(raiz) {
        return raiz === null ? 0 : raiz.altura
    }

    Equilibrio(raiz) {
        return raiz === null ? 0 : (this.Altura(raiz.derecho) - this.Altura(raiz.izquierdo))
    }

    RotacionIzq(raiz) {
        let raiz_derecho = raiz.derecho
        let hijo_izquierdo = raiz_derecho.izquierdo
        raiz_derecho.izquierdo = raiz
        raiz.derecho = hijo_izquierdo
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho))
        raiz_derecho.altura = 1 + Math.max(this.Altura(raiz_derecho.izquierdo), this.Altura(raiz_derecho.derecho))
        raiz.factor_equilibrio = this.Equilibrio(raiz)
        raiz_derecho.factor_equilibrio = this.Equilibrio(raiz_derecho)
        return raiz_derecho
    }

    RotacionDer(raiz) {
        let raiz_izquierdo = raiz.izquierdo
        let hijo_derecho = raiz_izquierdo.derecho
        raiz_izquierdo.derecho = raiz
        raiz.izquierdo = hijo_derecho
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho))
        raiz_izquierdo.altura = 1 + Math.max(this.Altura(raiz_izquierdo.izquierdo), this.Altura(raiz_izquierdo.derecho))
        raiz.factor_equilibrio = this.Equilibrio(raiz)
        raiz_izquierdo.factor_equilibrio = this.Equilibrio(raiz_izquierdo)
        return raiz_izquierdo

    }

    InsertarNodoArbolAVL(nodo, raiz) {
        if (raiz === null) {
            raiz = nodo
        } else {
            if (raiz.valor === nodo.valor) {
                raiz.valor = nodo.valor
            } else if (raiz.valor < nodo.valor) {
                raiz.derecho = this.InsertarNodoArbolAVL(nodo, raiz.derecho);
            } else {
                raiz.izquierdo = this.InsertarNodoArbolAVL(nodo, raiz.izquierdo);
            }
        }
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo), this.Altura(raiz.derecho))
        let balanceo = this.Equilibrio(raiz)
        raiz.factor_equilibrio = balanceo
        if (balanceo > 1 && nodo.valor > raiz.derecho.valor) {
            return this.RotacionIzq(raiz)
        }
        if (balanceo < -1 && nodo.valor < raiz.izquierdo.valor) {
            return this.RotacionDer(raiz)
        }
        if (balanceo > 1 && nodo.valor < raiz.derecho.valor) {
            raiz.derecho = this.RotacionDer(raiz.derecho)
            return this.RotacionIzq(raiz)
        }
        if (balanceo < -1 && nodo.valor > raiz.izquierdo.valor) {
            raiz.izquierdo = this.RotacionIzq(raiz.izquierdo)
            return this.RotacionDer(raiz)
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
            cadena += "\"" + raiz.valor + "\\n" + raiz.nombre + "\\nAltura: " + raiz.altura + "\""
            cadena += " "
            if (raiz.izquierdo !== null) {
                cadena += this.RecorridoPreorden(raiz.izquierdo)
                cadena += " "
                cadena += "\"" + raiz.valor + "\\n" + raiz.nombre + "\\nAltura: " + raiz.altura + "\""
                cadena += " -> "
                cadena += "\"" + raiz.izquierdo.valor + "\\n" + raiz.izquierdo.nombre + "\\nAltura: " + raiz.izquierdo.altura + "\""
                cadena += "\n"
            }
            if (raiz.derecho !== null) {
                cadena += " -> "
                cadena += "\"" + raiz.derecho.valor + "\\n" + raiz.derecho.nombre + "\\nAltura: " + raiz.derecho.altura + "\""
                cadena += this.RecorridoPreorden(raiz.derecho)
                cadena += "\n"
            }
        }
        return cadena
    }

    GraficarRecorridoPreOrden() {
        let cadena = ""
        cadena += "digraph G { graph[label = \"Pre-Orden\"]"
        cadena += "node [shape=circle];"
        cadena += this.RecorridoPreorden(this.raiz)
        cadena += "}";
        return cadena
    }
    //In-Orden
    RecorridoInorden(raiz) {
        let cadena = "";
        if (raiz !== null) {
            cadena += this.RecorridoInorden(raiz.izquierdo);
            cadena += "<tr><td>" + raiz.valor + "</td><td>" + raiz.nombre + "</td><td>"+raiz.password+"</td></tr>";
            cadena += this.RecorridoInorden(raiz.derecho);
        }
        return cadena;
    }

    GraficarRecorridoInOrden() {
        let cadena = ""
        if (this.raiz !== null) {
            cadena += "digraph Tabla { graph[label = \"Tabla Alumnos (In-Orden)\"]"
            cadena += "node [shape=plaintext];"
            cadena += "TablaAlumnos[label=<<table border=\"1\" cellborder=\"1\" cellspacing=\"0\">"
            cadena += "<tr><td colspan=\"3\" bgcolor=\"green\"><b>Alumnos</b></td></tr>"
            cadena += "<tr><td bgcolor=\"green\"><b>Carnet</b></td><td bgcolor=\"green\"><b>Nombre</b></td><td bgcolor=\"green\"><b>Contraseña</b></td></tr>"
            cadena += this.RecorridoInorden(this.raiz)
            cadena += "</table>>];"
            cadena += "}"
        }
        return cadena
    }
    //Post-Orden
    RecorridoPostOrden(raiz) {
        let cadena = "";
        if (raiz !== null) {
            cadena += this.RecorridoPostOrden(raiz.izquierdo);
            cadena += this.RecorridoPostOrden(raiz.derecho);
            cadena += "<tr><td>" + raiz.valor + "</td><td>" + raiz.nombre + "</td></tr>";
        }
        return cadena;
    }


    GraficarRecorridoPostOrden() {
        let cadena = ""
        if (this.raiz !== null) {
            cadena += "digraph Tabla { graph[label = \"Tabla Alumnos (Post-Orden)\"]"
            cadena += "node [shape=plaintext];"
            cadena += "TablaAlumnos[label=<<table border=\"1\" cellborder=\"1\" cellspacing=\"0\">"
            cadena += "<tr><td colspan=\"2\" bgcolor=\"green\"><b>Alumnos</b></td></tr>"
            cadena += "<tr><td bgcolor=\"green\"><b>Carnet</b></td><td bgcolor=\"green\"><b>Nombre</b></td></tr>"
            cadena += this.RecorridoPostOrden(this.raiz)
            cadena += "</table>>];"
            cadena += "}"
        }
        return cadena
    }

    ValoresArbol(raiz, id) {
        let cadena = ""
        let numero = id + 1
        if (raiz !== null) {
            cadena += "\"";
            cadena += raiz.valor;
            cadena += "\\n"
            cadena += raiz.nombre
            cadena += "\\nAltura: ";
            cadena += raiz.altura;
            cadena += "\"";
            if (!(raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\\n"
                cadena += raiz.nombre
                cadena += "\\nAltura: ";
                cadena += raiz.altura;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\\n"
                cadena += raiz.nombre
                cadena += "\\nAltura: ";
                cadena += raiz.altura;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.derecho, numero)
            } else if (!(raiz.izquierdo === null) && (raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\\n"
                cadena += raiz.nombre
                cadena += "\\nAltura: ";
                cadena += raiz.altura;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\\n"
                cadena += raiz.nombre
                cadena += "\\nAltura: ";
                cadena += raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
            } else if ((raiz.izquierdo === null) && !(raiz.derecho === null)) {
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.valor;
                cadena += "\\n"
                cadena += raiz.nombre
                cadena += "\\nAltura: ";
                cadena += raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "; \"";
                cadena += raiz.valor;
                cadena += "\\n"
                cadena += raiz.nombre
                cadena += "\\nAltura: ";
                cadena += raiz.altura;
                cadena += "\" -> ";
                cadena += this.ValoresArbol(raiz.derecho, numero)
            }
        }
        return cadena
    }

    //pre-orden
    TablaArbol(raiz) {
        let cadena = "";
        if (raiz !== null) {
            cadena += "<tr><td>" + raiz.valor + "</td><td>" + raiz.nombre + "</td></tr>";
            cadena += this.TablaArbol(raiz.izquierdo);
            cadena += this.TablaArbol(raiz.derecho);
        }
        return cadena;
    }

    GraficarArbol() {
        let cadena = ""
        if (this.raiz !== null) {
            cadena += "digraph arbol {  graph[label = \"Árbol AVL Alumnos\"]"
            cadena += "node [shape=circle];"
            cadena += this.ValoresArbol(this.raiz, 0)
            cadena += "}"
        }
        return cadena
    }

    GraficarTabla() {
        let cadena = ""
        if (this.raiz !== null) {
            cadena += "digraph Tabla { graph[label = \"Tabla Alumnos (Pre-Orden)\"]"
            cadena += "node [shape=plaintext];"
            cadena += "TablaAlumnos[label=<<table border=\"1\" cellborder=\"1\" cellspacing=\"0\">"
            cadena += "<tr><td colspan=\"2\" bgcolor=\"green\"><b>Alumnos</b></td></tr>"
            cadena += "<tr><td bgcolor=\"green\"><b>Carnet</b></td><td bgcolor=\"green\"><b>Nombre</b></td></tr>"
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

    BuscarCarnet(carnet) {
        let actual = this.raiz
        while (actual) {
            if (actual.valor === carnet) {
                return true
            }
            if (carnet < actual.valor) {
                actual = actual.izquierdo
            } else {
                actual = actual.derecho
            }

        }
        return false
    }
}