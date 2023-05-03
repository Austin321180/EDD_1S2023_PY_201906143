import { ArbolAVL } from '../EDD_Proyecto1_Fase3/EDD/ArbolAVL.js';
import { TablaHash } from './EDD/TablaHash.js';
/*import { ListaCircular } from '../EDD_Proyecto1_Fase2/EDD/ListaCircular.js';
import { MatrizDispersa } from '../EDD_Proyecto1_Fase2/EDD/Matriz.js';
import { ArbolNario } from '../EDD_Proyecto1_Fase2/EDD/ArbolMoN.js';*/
const arbol_avl = new ArbolAVL()
const tab = new TablaHash()
/*const lcirc = new ListaCircular()
const matriz_d = new MatrizDispersa()
const arboln_ario = new ArbolNario()*/
const btnArbol = document.querySelector('.btnarbol')
const btntabla = document.querySelector('.btntabla')
const btnpre = document.querySelector('.btnpre')
const btnpost = document.querySelector('.btnpost')
const btnlimpiar = document.querySelector('.btnlimpiar')
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
        arbol_avl.InsertarDatos(obj.alumnos[i].nombre, obj.alumnos[i].carnet, obj.alumnos[i].password, obj.alumnos[i].Carpeta_Raiz)
        localStorage.setItem(obj.alumnos[i].carnet, JSON.stringify({
            nombre: obj.alumnos[i].nombre,
            carnet: obj.alumnos[i].carnet,
            password: obj.alumnos[i].password,
            Carpeta_Raiz: obj.alumnos[i].Carpeta_Raiz,
            tipo: "estudiante"
        }));
    }
    const alumnoJSON = localStorage.getItem("201403877");
    const alumnoObj = JSON.parse(alumnoJSON);
    const nombre = alumnoObj.nombre;
    console.log(localStorage);
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


function refrescarArbolInOrden() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        try {
            let parsed = JSON.parse(value);
            if (parsed.tipo === 'estudiante') {
                tab.insertar(key, parsed.nombre, parsed.password);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
btntabla.addEventListener('click', refrescarArbolInOrden)
//fin pagina principal

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
    cadena += "<tr><td bgcolor=\"green\"><b>Propietario</b></td><td bgcolor=\"green\"><b>Destino</b></td><td bgcolor=\"green\"><b>Ubicacion</b></td><td bgcolor=\"green\"><b>Archivo</b></td><td bgcolor=\"green\"><b>Permiso</b></td></tr>";
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem("Permisos_" + key);
        try {
            let parsed = JSON.parse(value);
            if (parsed.tipo === 'Matriz') {
                cadena += "<tr><td>"
                cadena += parsed.Propietario
                cadena += "</td><td>";
                cadena += parsed.Destino
                cadena += "</td><td>";
                cadena += parsed.Ubicacion
                cadena += "</td><td>";
                cadena += parsed.Archivo
                cadena += "</td><td>";
                cadena += parsed.Permiso
                cadena += "</td>";
                cadena += "</tr>";
            }
        } catch (error) {
            console.log(error);
        }
    }
    cadena += "</table>>];"
    cadena += "}"
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(cadena);
    //console.log(cadena)
    $("#image1").attr("src", url + body);
}
btnpre.addEventListener('click', graficatablapermisos)