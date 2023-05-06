import { ArbolAVL } from '../EDD_Proyecto1_Fase3/EDD/ArbolAVL.js';
import { TablaHash } from './EDD/TablaHash.js';
import { ListaEnlazada } from './EDD/listadoble.js';
import { Block } from './EDD/BlockChain.js';
/*import { ListaCircular } from '../EDD_Proyecto1_Fase2/EDD/ListaCircular.js';
import { MatrizDispersa } from '../EDD_Proyecto1_Fase2/EDD/Matriz.js';
import { ArbolNario } from '../EDD_Proyecto1_Fase2/EDD/ArbolMoN.js';*/
const arbol_avl = new ArbolAVL()
const tab = new TablaHash()
const bloque = new Block()
const list = new ListaEnlazada()
/*const lcirc = new ListaCircular()
const matriz_d = new MatrizDispersa()
const arboln_ario = new ArbolNario()*/
const btnArbol = document.querySelector('.btnarbol')
const btntabla = document.querySelector('.btntabla')
const btnpre = document.querySelector('.btnpre')
const btnpost = document.querySelector('.btnpost')
const btnreporte_block = document.getElementById("reporte_block")
let primeraVez = true;

const inputElement = document.getElementById("carga");
inputElement.addEventListener("change", onChange, false);

function onChange() {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event) {
    localStorage.clear();
    var obj = JSON.parse(event.target.result);
    for (var i = 0; i < obj.alumnos.length; i++) {
        //tab.insertar(obj.alumnos[i].carnet,obj.alumnos[i].nombre,obj.alumnos[i].password);
        let avl = JSON.parse(localStorage.getItem("AVL")) || []
        arbol_avl.InsertarDatos(obj.alumnos[i].nombre, obj.alumnos[i].carnet, obj.alumnos[i].password, obj.alumnos[i].Carpeta_Raiz)
        avl.push({
            nombre: obj.alumnos[i].nombre,
            carnet: obj.alumnos[i].carnet,
            password: obj.alumnos[i].password,
            Carpeta_Raiz: obj.alumnos[i].Carpeta_Raiz,
            tipo: "estudiante"
        })
        localStorage.setItem("AVL", JSON.stringify(avl));
    }
    console.log(localStorage.getItem("AVL"));
    primeraVez = false;
}


function refrescarTabla() {
    let url = 'https://quickchart.io/graphviz?graph=';
    /*let estudiantes = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        try {
            let parsed = JSON.parse(value);
            if (parsed.tipo === 'estudiante') {
                estudiantes.push({
                    nombre: parsed.nombre,
                    carnet: key,
                    password: parsed.password,
                    Carpeta_Raiz: parsed.Carpeta_Raiz
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    estudiantes.forEach(estudiante => {
        arbol_avl.InsertarDatos(estudiante.nombre, estudiante.carnet, estudiante.password, estudiante.Carpeta_Raiz);
    })*/
    let body = encodeURIComponent(arbol_avl.GraficarTabla());
    $("#image").attr("src", url + body);
    document.getElementById("carga").value = "";
    console.log(url + body)
}


function refrescarArbol() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(arbol_avl.GraficarArbol());
    $("#image1").attr("src", url + body);
    document.getElementById("carga").value = "";
    console.log(url + body)
}
btnArbol.addEventListener('click', refrescarArbol)

function refrescarArbolPostOrden() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(arbol_avl.GraficarRecorridoPostOrden());
    $("#image").attr("src", url + body);
    document.getElementById("carga").value = "";
}
btnpost.addEventListener('click', refrescarArbolPostOrden)

//cambiar
async function refrescarArbolInOrden() {
    let tablahas = JSON.parse(localStorage.getItem("TablaHash")) || []
    let avl = JSON.parse(localStorage.getItem("AVL")) || [];
    for (let i = 0; i < avl.length; i++) {
        let estudiante = avl[i];
        const estu = await bloque.sha256(estudiante.password)
        tablahas.push({
            usuario: estudiante.nombre,
            carnet: estudiante.carnet,
            contraseña: estu,
            tipo: "TablaHash"
        })
        localStorage.setItem("TablaHash", JSON.stringify(tablahas));
        tab.insertar(estudiante.carnet, estudiante.nombre, estudiante.password);
    }
}
btntabla.addEventListener('click', refrescarArbolInOrden)
//fin pagina principal
let bloque_actual;
function refrescarTablaHash() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(tab.graficaraTablaHash());
    //console.log(tab.graficaraTablaHash())
    $("#image").attr("src", url + body);
    document.getElementById("carga").value = "";
    //console.log(url + body)
}
btnpost.addEventListener('click', refrescarTablaHash)

function graficatablapermisos() {
    let cadena = "";
    cadena += "digraph G { graph[label = \"Tabla Permisos\"]";
    cadena += "node [shape=plaintext];";
    cadena += "TablaHash[label=<<table border=\"1\" cellborder=\"1\" cellspacing=\"0\">";
    cadena += "<tr><td colspan=\"5\" bgcolor=\"green\"><b>Permisos</b></td></tr>";
    cadena += "<tr><td bgcolor=\"green\"><b>Propietario</b></td><td bgcolor=\"green\"><b>Destino</b></td><td bgcolor=\"green\"><b>Archivo</b></td><td bgcolor=\"green\"><b>Permiso</b></td></tr>";
    let compartir = JSON.parse(localStorage.getItem('Compartidos')) || [];
    compartir.forEach(Compartido => {
        cadena += "<tr><td>"
        cadena += Compartido.Propietario
        cadena += "</td><td>";
        cadena += Compartido.Compartido
        cadena += "</td><td>";
        cadena += Compartido.NombreArchivo
        cadena += "</td><td>";
        cadena += Compartido.Permisos
        cadena += "</td>";
        cadena += "</tr>";
    });
    cadena += "</table>>];"
    cadena += "}"
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(cadena);
    //console.log(cadena)
    $("#image1").attr("src", url + body);
}
btnpre.addEventListener('click', graficatablapermisos)


const bntreporte = document.getElementById("hacer_reporte")
bntreporte.addEventListener("click", reporte)
function reporte() {
    const mensajes = JSON.parse(localStorage.getItem("Mensajes")) || [];
    mensajes.forEach(message => {
        list.insertardatos(message.Bloques, message.Fecha, message.Emisor, message.Recpetor, message.Mensaje, message.Hash, message.Hash2, message.Desencriptado)
    })
    bloque_actual = list.inicio
    if (bloque_actual != null) {
        let cadena = "Index: " + bloque_actual.valor['index'];
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte").value = cadena;
        mostrar_Mensaje_descriptado();
    }
}


const btnReporte1 = document.getElementById("reporte_siguiente")
btnReporte1.addEventListener("click", reporte_siguente)

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
        document.getElementById("reporte").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte2 = document.getElementById("reporte_anterior")
btnReporte2.addEventListener("click", reporte_anterior)

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
        document.getElementById("reporte").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

function mostrar_Mensaje_descriptado() {
    //let cadena = await desencriptacion(bloque_actual.valor['message'])
    document.getElementById("mensaje_desencriptado").value = bloque_actual.valor['desencriptado']
    //console.log(cadena);
}

btnreporte_block.addEventListener('click',refrescarreporteblock)
function refrescarreporteblock(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(list.graficar());
    $("#image5").attr("src", url + body);
}