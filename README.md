# Manual Tecnico

## Computador

Computadora con sistema Operativo Windows 11 version 21H2.
*Información:*

* Memoria RAM 8GB
* Memoria Virtual total 16.3 GB
* Tipo Sistema x64


## IDE
### Visual Studio Code

Visual Studio Code (VS Code) es un editor de código fuente desarrollado por Microsoft. Es software libre y multiplataforma, está disponible para Windows, GNU/Linux y macOS. VS Code tiene una buena integración con Git, cuenta con soporte para depuración de código, y dispone de un sinnúmero de extensiones, que básicamente te da la posibilidad de escribir y ejecutar código en cualquier lenguaje de programación.


## Lenguaje de programación
### Javascript

JavaScript es un lenguaje de programación que los desarrolladores utilizan para hacer páginas web interactivas. Desde actualizar fuentes de redes sociales a mostrar animaciones y mapas interactivos, las funciones de JavaScript pueden mejorar la experiencia del usuario de un sitio web. Como lenguaje de scripting del lado del servidor, se trata de una de las principales tecnologías de la World Wide Web.

### HTML

HTML es el lenguaje con el que se define el contenido de las páginas web. Básicamente se trata de un conjunto de etiquetas que sirven para definir el texto y otros elementos que compondrán una página web, como imágenes, listas, vídeos, etc.
### CSS
CSS son las siglas en inglés de Cascading Style Sheets, que significa «hojas de esilo en cascada». Es un lenguaje que se usa para estilizar elementos escritos en un lenguaje de marcado como HTML.

## Aplicación
La aplicacion consistia, con el archivo json de la fase 1 crear una pagina que guardara un arbol avl con estos datos del json y luego entrar con este usuario a su interfaz, luego se pueden crear carpetas y subir documentos, esto se podra ver reflejado con graphviz en la misma pagina, al igual que su bitacora y el usuario podra poner los permisos a otro usuario si es que existe a sus archivos.

### Localstorage
LocalStorage es una herramienta compatible con html5 y los navegadores que lo soportan, incluso explorer desde su versión 8 hacia arriba. La gracia de ésta es la capacidad para almacenar datos de manera local en el navegador que utiliza el usuario mientras navega.

## Clases
Para las estructuras de datos se crearon clases:

### Arbol Avl

```
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

export class ArbolAVL {//aqui van todos los metodos}
```
### Arbol N-ario
```
class NodoArbolNario {
    constructor(valor, id) {
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
        this.hijos = [];
    }
}

export class ArbolNario {//aqui van todos los metodos}
```

### Matriz Dispersa

```
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

export class MatrizDispersa {//aqui van todos los metodos}
```

### Lista Circular
```
class NodoListaCircular {
    constructor(fecha, hora, texto) {
        this.fecha = fecha
        this.hora = hora
        this.texto = texto
        this.siguiente = null
    }
}

export class ListaCircular {//aqui van todos los metodos}
```

## Importaciones y Exportaciones

al momento de crear la apliacion se dijo que cada arbol avl deberia tener un arbol n-ario y cada arbol n-ario deberia tener una matriz dispersa y una lista circular pero para eso se hiciero exportaciones de cada clase

### Arbol AVL
```
export class ArbolAVL
```

### Arbol N-ario
```
export class ArbolNario
```

### Matriz Dispersa
```
export class MatrizDispersa
```

### Lista Circular
```
export class ListaCircular
```

Las Importaciones fueron de la siguiente manera: 

```
import { ArbolAVL } from '../EDD_Proyecto1_Fase2/EDD/ArbolAVL.js';
import { ListaCircular } from './ListaCircular.js';
import { ArbolNario } from './ArbolMoN.js';
import { MatrizDispersa } from './Matriz.js';
```

## Metodos

Cada clase tiene sus propios metodos pero hay un metodo que tienen en comun todas las clases y ese es el de graficar()

### Arbol AVL
```
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
```

### Arbol N-ario
```
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
```

### Lista Circular
```
graficarlista() {
        if (this.tamaño === 0) {
            return "";
        }
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
```

### Matriz Dispersa

```
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
```
