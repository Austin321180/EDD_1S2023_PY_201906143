import { ArbolAVL } from '../EDD_Proyecto1_Fase2/EDD/ArbolAVL.js';
/*import { ListaCircular } from '../EDD_Proyecto1_Fase2/EDD/ListaCircular.js';
import { MatrizDispersa } from '../EDD_Proyecto1_Fase2/EDD/Matriz.js';
import { ArbolNario } from '../EDD_Proyecto1_Fase2/EDD/ArbolMoN.js';*/
const arbol_avl = new ArbolAVL()
/*const lcirc = new ListaCircular()
const matriz_d = new MatrizDispersa()
const arboln_ario = new ArbolNario()*/
const btnacarpeta = document.querySelector('.btnacarpeta')
const btnarbolnario = document.querySelector('.btnarbolnario')
const btnbitacora = document.querySelector('.btnbitacora')
const btnbuscar = document.querySelector('.btnbuscar')
const btnpermisos = document.querySelector('.btnpermisos')
const btnarchivos = document.querySelector('.btnarchivos')

//inicio usuarios

function agregarVarios() {
    let ruta = document.getElementById("ruta").value
    let carpeta = document.getElementById("carpeta").value
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
    let body = arbol_avl.arbol_nario.grafica_arbol()
    //arbol_avl.raiz.grafica_arbol();
    $("#image1").attr("src", url + body);
    document.getElementById("carpeta").value = "";
}
btnarbolnario.addEventListener('click', refrescarArbolNario)

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
    let body = arbol_avl.lcirc.graficarlista();
    $("#image").attr("src", url + body);
    //document.getElementById("carpeta").value = "";
    console.log(url + body)
}
btnbitacora.addEventListener('click', refrescarlistacircular)

function mostrarcarpetas() {
    let ruta = document.getElementById("ruta").value
    arbol_avl.arbol_nario.mostrarCarpeta(ruta)
}
btnbuscar.addEventListener('click', mostrarcarpetas)

const inputElement = document.getElementById("inputFile");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
            const nombreArchivo = file.name;
            const base64String = e.target.result;
            cargarArchivo(nombreArchivo, base64String);
        };
        reader.readAsDataURL(file);
    }
}

function cargarArchivo(nombreArchivo, base64String) {
    arbol_avl.arbol_nario.mD.InsertarArchivo(nombreArchivo, 1);
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
        reporteMatriz();
        console.log(`El alumno ${alumno.nombre} existe`);
        const fechaYHora = arbol_avl.arbol_nario.obtenerFechaYHora();
        try {
            console.log(fechaYHora.fecha, fechaYHora.hora, " Se creo la carpeta: " + arreglo[0])
            arbol_avl.lcirc.AgregarValor(fechaYHora.fecha, fechaYHora.hora, " Se Agrego: " + arreglo[0])
        } catch (error) {
            alert("Hubo un error al insertar la carpeta")
        }
    } else {
        alert(`El carnet no existe`);
    }

}
btnpermisos.addEventListener('click', AsignarPermisos)

function reporteMatriz() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbol_avl.arbol_nario.mD.reporte();
    $("#image").attr("src", url + body)
}
btnarchivos.addEventListener('click', reporteMatriz)