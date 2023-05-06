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

### Tabla Hash

```
class nodoHash {
    constructor(carnet, usuario, password) {
        this.carnet = carnet
        this.usuario = usuario
        this.password = password
        this.grafod = new GrafoDirigido()
    }
}

export class TablaHash {//aqui van todos los metodos}
```
### Arbol Grafo
```
class nodoMatrizAdyacencia {
    constructor(valor) {
        this.siguiente = null
        this.abajo = null
        this.valor = valor
    }
}

export class GrafoDirigido {//aqui van todos los metodos}
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

### BlockChain

```
class nodoBloque {
    constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash) {
        this.valor = {
            'index': index,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': previousHash,
            'hash': hash
        }
        this.siguiente = null
        this.anterior = null
    }
}

export class Block {//aqui van todos los metodos}
```
## Importaciones y Exportaciones

al momento de crear la apliacion se dijo que cada arbol avl deberia tener un arbol n-ario y cada arbol n-ario deberia tener una matriz dispersa y una lista circular pero para eso se hiciero exportaciones de cada clase

### Tabla Hash
```
export class TablaHash
```

### Blockchain
```
export class Block
```

### Matriz Dispersa
```
export class MatrizDispersa
```
### Grafo
```
export class GrafoDirigido
```


Las Importaciones fueron de la siguiente manera: 

```
import { TablaHash } from './EDD/TablaHash.js';
import { Block } from './EDD/BlockChain.js';
import { GrafoDirigido } from './EDD/GrafoDirigido.js';
import { MatrizDispersa } from './Matriz.js';
```

## Metodos

Cada clase tiene sus propios metodos pero hay un metodo que tienen en comun todas las clases y ese es el de graficar()

### TablaHash
```
graficaraTablaHash() {
        let cadena = ""
        cadena += "digraph G { graph[label = \"Tabla Hash\"]";
        cadena += "node [shape=plaintext];";
        cadena += "TablaHash[label=<<table border=\"1\" cellborder=\"1\" cellspacing=\"0\">";
        cadena += "<tr><td colspan=\"3\" bgcolor=\"green\"><b>Alumnos</b></td></tr>";
        cadena += "<tr><td bgcolor=\"green\"><b>Carnet</b></td><td bgcolor=\"green\"><b>Nombre</b></td><td bgcolor=\"green\"><b>Constraseña</b></td></tr>";
        let tablahas = JSON.parse(localStorage.getItem("TablaHash")) || []
        tablahas.forEach(tabla => {
            cadena += "<tr>"
            cadena += "<td>";
            cadena += tabla.carnet;
            cadena += "</td><td>";
            cadena += tabla.usuario;
            cadena += "</td><td>";
            cadena += tabla.contraseña;
            cadena += "</td>";
            cadena += "</tr>";
        });
        cadena += "</table>>];"
        cadena += "}"

        return cadena
    }
```

### grafo
```
grafica() {
        let cadena = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let auxPadre = this.principal
        let auxHijo = this.principal
        let peso = 0
        while (auxPadre) {
            auxHijo = auxPadre.siguiente
            let profundidad = auxPadre.valor.split('/')
            let padre = ""
            if (profundidad.length == 2 && profundidad[1] == "") { peso = 1 }
            else if (profundidad.length == 2 && profundidad[1] != "") { peso = 2 }
            else { peso = profundidad.length }
            if (auxPadre.valor != "/") { padre = profundidad[profundidad.length - 1] }
            else { padre = "/" }
            while (auxHijo) {
                cadena += "\"" + padre + "\"" + " -- " + "\"" + auxHijo.valor + "\"" + " [label=\"" + peso + "\"] ";
                auxHijo = auxHijo.siguiente;
            }
            auxPadre = auxPadre.abajo
        }
        cadena += "}"
        return cadena
    }
```

### BlockChain
```
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
```
## Encriptacion Contraseña

cada vez que se intenta iniciar sesion se introducira el carnet que sería el username y la contraseña que se encriptara con ayuda de sha256 que recive un mensaje que en este caso seria la contraseña

### Sha256

```
async sha256(mensaje) {
        let cadenaFinal
        const enconder = new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
            .then(result => {
                const hashArray = Array.from(new Uint8Array(result))
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
                cadenaFinal = hashHex
            })
            .catch(error => console.log(error))
        return cadenaFinal
    }
```

luego se crea la funcion async de login que aqui toma los valores de los label para ver si logra entrar o no
utiliza el metodo async porque tambien se utiliza la propiedad await, si no se coloca jamas obtendremos la contraseña encriptada y nos retornara undefine

### Login()
```
async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        window.location.href = "EDD_Proyecto1_Fase3/PaginaPrincipal.html";
    } else {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        let tablahas = JSON.parse(localStorage.getItem("TablaHash")) || []
        for (let i = 0; i < tablahas.length; i++) {
            const carnet = tablahas[i].carnet;
            const usuario = tablahas[i].usuario;
            const password = tablahas[i].contraseña;
            console.log("pass: " + password)
            tabla.insertar(carnet, usuario, password);
        }
        let contrseña = await bloque.sha256(password)
        sessionStorage.setItem("username", username);
        tabla.busquedaUsuario(username, contrseña)
    }
}
```
luego en busquedaUsuario se verifica la contraseña encriptada y el carnet con los datos que ya tiene la tabla hash al momento de cambiar las estructuras

### busquedaUsuario()
```
busquedaUsuario(carnet, encriptado) {
        let indice = this.calculoIndice(carnet)
        if (indice < this.capacidad) {
            try {
                if (this.tabla[indice] == null) {
                    alert("No hay alumnos")
                } else if (this.tabla[indice] != null && this.tabla[indice].carnet == carnet) {
                    if (this.tabla[indice].password == encriptado) {
                        window.location.href = "EDD_Proyecto1_Fase3/Usuarios.html";
                    } else {
                        alert("Datos incorrectos")
                    }
                } else {
                    let contador = 1
                    indice = this.RecalculoIndice(carnet, contador)
                    while (this.tabla[indice] != null) {
                        if (this.tabla[indice].carnet == carnet) {
                            if (this.tabla[indice].password == encriptado) {
                                window.location.href = "EDD_Proyecto1_Fase3/Usuarios.html";
                            } else {
                                alert("Datos incorrectos")
                            }
                            return
                        }
                        contador++
                        indice = this.RecalculoIndice(carnet, contador)
                    }
                }
            } catch (err) {
                console.log("Hubo un error en busqueda")
            }
        }
    }
```
