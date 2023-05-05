import { Block } from "./BlockChain.js"
import { desencriptacion, encriptacion } from './Encriptacion.js'
import { GrafoDirigido } from "./GrafoDirigido.js"
const bloque = new Block()

class nodoHash {
    constructor(carnet, usuario, password) {
        this.carnet = carnet
        this.usuario = usuario
        this.password = password
        this.grafod = new GrafoDirigido()
    }
}

class TablaHash {
    constructor() {
        this.tabla = new Array(7)
        this.capacidad = 7
        this.utilizacion = 0
        this.grafod=null
    }

    async insertar(carnet, usuario, password) {
        let indice = this.calculoIndice(carnet)
        const nuevoNodo = new nodoHash(carnet, usuario, password)
        if (indice < this.capacidad) {
            try {
                if (this.tabla[indice] == null) {
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                } else {
                    let contador = 1
                    indice = this.RecalculoIndice(carnet, contador)
                    while (this.tabla[indice] != null) {
                        contador++
                        indice = this.RecalculoIndice(carnet, contador)
                    }
                    this.tabla[indice] = nuevoNodo
                    this.utilizacion++
                    this.capacidad_tabla()
                }
            } catch (err) {
                console.log("Hubo un error en insercion")
            }
        }
    }

    calculoIndice(carnet) {
        let carnet_cadena = carnet.toString()
        let divisor = 0
        for (let i = 0; i < carnet_cadena.length; i++) {
            divisor = divisor + carnet_cadena.charCodeAt(i)
        }
        let indice_final = divisor % this.capacidad
        return indice_final
    }

    capacidad_tabla() {
        let aux_utilizacion = this.capacidad * 0.75
        if (this.utilizacion > aux_utilizacion) {
            this.capacidad = this.nueva_capacidad()
            this.utilizacion = 0
            this.ReInsertar()
        }
    }

    nueva_capacidad() {
        let numero = this.capacidad + 1;
        while (!this.isPrime(numero)) {
            numero++;
        }
        return numero;
    }

    ReInsertar() {
        const auxiliar_tabla = this.tabla
        this.tabla = new Array(this.capacidad)
        auxiliar_tabla.forEach((alumno) => {
            this.insertar(alumno.carnet, alumno.usuario, alumno.password)
        })
    }

    RecalculoIndice(carnet, intento) {
        let nuevo_indice = this.calculoIndice(carnet) + intento * intento
        let nuevo = this.nuevo_Indice(nuevo_indice)
        return nuevo
    }

    nuevo_Indice(numero) {
        let nueva_posicion = 0
        if (numero < this.capacidad) {
            nueva_posicion = numero
        } else {
            nueva_posicion = numero - this.capacidad
            nueva_posicion = this.nuevo_Indice(nueva_posicion)
        }
        return nueva_posicion
    }

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


    isPrime(numero) {
        if (numero <= 1) { return false }
        if (numero === 2) { return true }
        if (numero % 2 === 0) { return false }
        for (let i = 3; i <= Math.sqrt(numero); i += 2) {
            if (numero % i === 0) { return false };
        }
        return true;
    }

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

}

export { TablaHash }