import { ArbolAVL } from '../EDD_Proyecto1_Fase2/EDD/ArbolAVL.js';
/*import { ListaCircular } from '../EDD_Proyecto1_Fase2/EDD/ListaCircular.js';
import { MatrizDispersa } from '../EDD_Proyecto1_Fase2/EDD/Matriz.js';
import { ArbolNario } from '../EDD_Proyecto1_Fase2/EDD/ArbolMoN.js';*/
const arbol_avl = new ArbolAVL()
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
btnpre.addEventListener('click', refrescarTabla)


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
    let url = 'https://quickchart.io/graphviz?graph=';
    let body;
    if (!primeraVez) {
        body = encodeURIComponent(arbol_avl.GraficarRecorridoInOrden());
        $("#image").attr("src", url + body);
    } else {
        let estudiantes = [];
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
        });
        let body = encodeURIComponent(arbol_avl.GraficarRecorridoInOrden());
        $("#image").attr("src", url + body);
    }
    document.getElementById("carga").value = "";
    console.log(url + body);
}
btntabla.addEventListener('click', refrescarArbolInOrden)
//fin pagina principal

function limpiar() {
    localStorage.clear()
}
btnlimpiar.addEventListener('click', limpiar)