import { ArbolAVL } from '../EDD_Proyecto1_Fase3/EDD/ArbolAVL.js';
import { Block } from './EDD/BlockChain.js';
import { encriptacion, desencriptacion } from './EDD/Encriptacion.js';
import { TablaHash } from './EDD/TablaHash.js';
/*import { ListaCircular } from '../EDD_Proyecto1_Fase2/EDD/ListaCircular.js';
import { MatrizDispersa } from '../EDD_Proyecto1_Fase2/EDD/Matriz.js';
import { ArbolNario } from '../EDD_Proyecto1_Fase2/EDD/ArbolMoN.js';*/
const arbol_avl = new ArbolAVL()
const bloque = new Block()
const tab = new TablaHash()
/*const lcirc = new ListaCircular()
const matriz_d = new MatrizDispersa()
const arboln_ario = new ArbolNario()*/
const btnacarpeta = document.querySelector('.btnacarpeta')
const btnarbolnario = document.querySelector('.btnarbolnario')
const btnbitacora = document.querySelector('.btnbitacora')
const btnbuscar = document.querySelector('.btnbuscar')
const btnpermisos = document.querySelector('.btnpermisos')
const btnarchivos = document.querySelector('.btnarchivos')
const btneliminar = document.querySelector('.btneliminar')

//inicio usuarios

function agregarVarios() {
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
    if (carpeta === '') {
        alert("El campo carpeta está vacío")
        return
    }
    try {
        arbol_avl.arbol_nario.insertarValor(ruta, carpeta)
        //arbol_avl.arbol_nario.insertarValor(ruta, carpeta)
        //arbolnario.insertarValor(ruta, carpeta)
    } catch (error) {
        alert("Hubo un error al insertar la carpeta")
    }
    agregarCarpetaFechayHora()
    document.getElementById("carpeta").value = "";
}
btnacarpeta.addEventListener('click', agregarVarios)

function refrescarArbolNario() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(arbol_avl.arbol_nario.grafica_arbol());
    //arbol_avl.raiz.grafica_arbol();
    $("#image1").attr("src", url + body);
    document.getElementById("carpeta").value = "";
}
btnarbolnario.addEventListener('click', refrescarArbolNario)

function Eliminar() {
    let ruta = document.getElementById("ruta").value
    const fechaYHora = arbol_avl.arbol_nario.obtenerFechaYHora();
    try {
        arbol_avl.arbol_nario.eliminarCarpeta(ruta)
        console.log(fechaYHora.fecha, fechaYHora.hora, " Se creo la carpeta: " + ruta)
        arbol_avl.lcirc.AgregarValor(fechaYHora.fecha, fechaYHora.hora, " Se Elimino: " + ruta)
    } catch (error) {
        alert("Hubo un error al eliminar la carpeta")
    }
    document.getElementById("carpeta").value = "";
}
btneliminar.addEventListener('click', Eliminar)

function agregarCarpetaFechayHora() {
    let carpeta = document.getElementById("carpeta").value
    const fechaYHora = arbol_avl.arbol_nario.obtenerFechaYHora();
    try {
        console.log(fechaYHora.fecha, fechaYHora.hora, " Se creo la carpeta: " + carpeta)
        arbol_avl.lcirc.AgregarValor(fechaYHora.fecha, fechaYHora.hora, " Se Agrego: " + carpeta)
    } catch (error) {
        alert("Hubo un error al insertar la carpeta")
    }
}

function refrescarlistacircular() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(arbol_avl.lcirc.graficarlista());
    $("#image").attr("src", url + body);
    //document.getElementById("carpeta").value = "";
    console.log(url + body)
}
btnbitacora.addEventListener('click', refrescarlistacircular)

function mostrarcarpetas() {
    let ruta = document.getElementById("ruta").value
    //arbol_avl.arbol_nario.mostrarCarpeta(ruta)
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(arbol_avl.arbol_nario.mostrarCarpeta(ruta));
    $("#image1").attr("src", url + body)
}
btnbuscar.addEventListener('click', mostrarcarpetas)

const inputElement = document.getElementById("inputFile");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    let ruta = document.getElementById("ruta").value
    for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
            const nombreArchivo = file.name;
            const base64String = e.target.result;
            cargarArchivo(nombreArchivo, base64String);
            arbol_avl.arbol_nario.insertarValor(ruta, nombreArchivo)
            localStorage.setItem(nombreArchivo, base64String);
            console.log(localStorage.getItem(nombreArchivo));
        };
        reader.readAsDataURL(file);
    }
}

function cargarArchivo(nombreArchivo, base64String) {
    const fechaYHora = arbol_avl.arbol_nario.obtenerFechaYHora();
    arbol_avl.arbol_nario.mD.InsertarArchivo(nombreArchivo, 1);
    try {
        console.log(fechaYHora.fecha, fechaYHora.hora, " Se creo el archivo: " + nombreArchivo)
        arbol_avl.lcirc.AgregarValor(fechaYHora.fecha, fechaYHora.hora, " Se agrego el archivo: " + nombreArchivo)
        reporteMatriz();
    } catch (error) {
        alert("Hubo un error ")
    }
}

function AsignarPermisos() {
    let cadena = document.getElementById("permiso").value
    let arreglo = cadena.split('-')
    let alumno = JSON.parse(localStorage.getItem(arreglo[1]));
    //console.log(alumno.nombre);
    //console.log(alumno.password);
    //console.log(alumno.Carpeta_Raiz);
    if (alumno) {
        arbol_avl.arbol_nario.mD.Permisos(arreglo[0], arreglo[1], arreglo[2])
        console.log(`El alumno ${alumno.nombre} existe`);
        const fechaYHora = arbol_avl.arbol_nario.obtenerFechaYHora();
        try {
            console.log(fechaYHora.fecha, fechaYHora.hora, " Se creo la carpeta: " + arreglo[0])
            arbol_avl.lcirc.AgregarValor(fechaYHora.fecha, fechaYHora.hora, " Se Otorgo perismos de: " + arreglo[2] + "\\n para: " + arreglo[0] + "\\n al carnet: " + arreglo[1])
            reporteMatriz();
        } catch (error) {
            alert("Hubo un error ")
        }
    } else {
        alert(`El carnet no existe`);
    }
    reporteMatriz()

}
btnpermisos.addEventListener('click', AsignarPermisos)

function reporteMatriz() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(arbol_avl.arbol_nario.mD.reporte());
    $("#image").attr("src", url + body)
}
btnarchivos.addEventListener('click', reporteMatriz)


//fase 3



let bloque_actual
function fechaActual() {
    let cadena = ''
    const fechaActual = new Date();
    cadena += fechaActual.getDate() < 10 ? ("0" + fechaActual.getDate() + "-") : (fechaActual.getDate() + "-")
    cadena += fechaActual.getMonth() < 10 ? ("0" + (fechaActual.getMonth() + 1) + "-") : (fechaActual.getMonth() + "-")
    cadena += fechaActual.getFullYear() + "::"
    cadena += fechaActual.getHours() < 10 ? ("0" + fechaActual.getHours() + ":") : (fechaActual.getHours() + ":")
    cadena += fechaActual.getMinutes() < 10 ? ("0" + fechaActual.getMinutes() + ":") : (fechaActual.getMinutes() + ":")
    cadena += fechaActual.getSeconds() < 10 ? ("0" + fechaActual.getSeconds()) : (fechaActual.getSeconds())
    return cadena
}
const btnEnviar = document.querySelector('.btnenviar')
btnEnviar.addEventListener("click", enviarMensaje)

function enviarMensaje() {
    let receptor = document.getElementById("Receptor").value
    let alumno = JSON.parse(localStorage.getItem("TablaHash" + receptor));
    //verdificar que existe el carnet del receptor
    if (alumno) {
        var username = sessionStorage.getItem('username');
        let receptor_mensaje = document.getElementById("Receptor").value
        let mensaje_final = document.getElementById("message").value
        bloque.insertarBloque(fechaActual(), username, receptor_mensaje, mensaje_final)
        console.log("Mensaje Enviado")
    }else{
        alert("El carnet no existe")
    }
}
const bntreporte = document.getElementById("reporte")
bntreporte.addEventListener("click", reporte)
function reporte() {
    bloque_actual = bloque.inicio
    if (bloque_actual != null) {
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        //document.getElementById("reporte-bloques").value = cadena
        console.log(cadena);
        mostrar_Mensaje_descriptado()
    }
}

//const btnReporte1 = document.getElementById("siguiente-bloque")
//btnReporte1.addEventListener("click", reporte_siguente)

function reporte_siguente() {
    if (bloque_actual.siguiente != null) {
        bloque_actual = bloque_actual.siguiente
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

//const btnReporte2 = document.getElementById("anterior-bloque")
//btnReporte2.addEventListener("click", reporte_anterior)

function reporte_anterior() {
    if (bloque_actual.anterior != null) {
        bloque_actual = bloque_actual.anterior
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

async function mostrar_Mensaje_descriptado() {
    /** if carnet ==  bloque_actual.valor['receiver'] y  bloque_actual.valor['trasmitter'] == emisor
     * mostrar mensaje
     * bloque_actual = abloque_actual.siguiente
     */
    let cadena = await desencriptacion(bloque_actual.valor['message'])
    //document.getElementById("reporte-mensajes").value = cadena
    console.log(cadena);
}