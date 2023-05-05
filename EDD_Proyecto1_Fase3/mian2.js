import { ArbolAVL } from '../EDD_Proyecto1_Fase3/EDD/ArbolAVL.js';
import { Block } from './EDD/BlockChain.js';
import { encriptacion, desencriptacion } from './EDD/Encriptacion.js';
import { TablaHash } from './EDD/TablaHash.js';
import { GrafoDirigido } from './EDD/GrafoDirigido.js';
/*import { ListaCircular } from '../EDD_Proyecto1_Fase2/EDD/ListaCircular.js';
import { MatrizDispersa } from '../EDD_Proyecto1_Fase2/EDD/Matriz.js';
import { ArbolNario } from '../EDD_Proyecto1_Fase2/EDD/ArbolMoN.js';*/
const arbol_avl = new ArbolAVL()
const bloque = new Block()
const grafD = new GrafoDirigido()
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
    refrecargrafodirigido()
    $("#image1").attr("src", url + body);
    document.getElementById("carpeta").value = "";
}
btnarbolnario.addEventListener('click', refrecargrafodirigido)

//grafo del grafo_dirigido
function refrecargrafodirigido() {
    //insertar valores en el grafo
    arbol_avl.arbol_nario.grafo()
    let compartir = JSON.parse(localStorage.getItem("grafo")) || []
    compartir.forEach(gra => {
        var username = sessionStorage.getItem('username');
        if (gra.usuario == username) {
            grafD.insertarValores(gra.padre, gra.hijos)
        }else{
            console.log("no tiene carpetas creadas")
        }
    })
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = encodeURIComponent(grafD.grafica());
    $("#image1").attr("src", url + body);
    document.getElementById("carpeta").value = "";
    //console.log(grafD.grafica())
}

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
    let ruta = "";
    var username = sessionStorage.getItem('username');
    let arreglo = cadena.split('-')
    let tablahas = JSON.parse(localStorage.getItem("TablaHash")) || [];
    let existe = false;
    for (let i = 0; i < tablahas.length; i++) {
        console.log(tablahas[i].carnet + " = " + arreglo[1])
        if (tablahas[i].carnet == arreglo[1]) {
            existe = true;
            break;
        }
    }
    if (existe) {
        console.log(arreglo[0] + " compartido con " + arreglo[1])
        //guardar datos localstorage permisos
        let codigoBase64 = localStorage.getItem(arreglo[0]);
        let compartir = JSON.parse(localStorage.getItem("Compartidos")) || []
        let tipoArchivo;
        if (arreglo[0].endsWith(".pdf")) {
            tipoArchivo = "pdf";
        } else if (arreglo[0].endsWith(".png") || arreglo[0].endsWith(".jpg") || arreglo[0].endsWith(".jpeg") || arreglo[0].endsWith(".gif")) {
            tipoArchivo = "imagen";
        } else if (arreglo[0].endsWith(".txt")) {
            tipoArchivo = "texto";
        }
        compartir.push({
            Propietario: username,
            Compartido: arreglo[1],
            NombreArchivo: arreglo[0],
            bas64: codigoBase64,
            Permisos: arreglo[2],
            TipoArchivo: tipoArchivo,
            tipo: "Compartidos"
        });
        localStorage.setItem("Compartidos", JSON.stringify(compartir));
        arbol_avl.arbol_nario.mD.Permisos(arreglo[0], arreglo[1], arreglo[2])
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
    let tablahas = JSON.parse(localStorage.getItem("TablaHash")) || [];
    let existe = false;
    for (let i = 0; i < tablahas.length; i++) {
        if (tablahas[i].carnet == receptor) {
            existe = true;
            break;
        }
    }
    if (existe) {
        var username = sessionStorage.getItem('username');
        let receptor_mensaje = document.getElementById("Receptor").value
        let mensaje_final = document.getElementById("message").value
        bloque.insertarBloque(fechaActual(), username, receptor_mensaje, mensaje_final)
        console.log("Mensaje Enviado a " + receptor)
    } else {
        alert("El carnet no existe")
    }
}

//mensajes
const form = document.querySelector('form');
const chat = document.querySelector('#chat');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var user = sessionStorage.getItem('username');
    let receptor = document.getElementById("Receptor").value
    const username = document.querySelector('#username').value;
    const message = document.querySelector('#message').value;
    const data = { user, message, receptor };
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(data);
    localStorage.setItem('messages', JSON.stringify(messages));
    showMessages(messages);
});

function showMessages(messages) {
    chat.innerHTML = '';
    var user = sessionStorage.getItem('username');
    messages.forEach(message => {
        const div = document.createElement('div');
        if (message.user === user) {
            div.innerHTML = `<strong>Tú: ${message.user}</strong>: ${message.message}`;
        } else if (message.receptor === user) {
            div.innerHTML = `<strong>Receptor: ${message.user}</strong>: ${message.message}`;
        }
        chat.appendChild(div);
    });
}

showMessages(JSON.parse(localStorage.getItem('messages')) || []);

let compartir = JSON.parse(localStorage.getItem("Compartidos")) || [];
const archivoVisor = document.querySelector('#archivo-visor');
compartir.forEach(Compartido => {
    var user = sessionStorage.getItem('username');
    if (Compartido.Compartido === user) {
        switch (Compartido.TipoArchivo) {
            case 'pdf':
                archivoVisor.innerHTML += `<iframe src="${Compartido.bas64}" width="100%" height="500px"></iframe>`;
                break;
            case 'imagen':
                archivoVisor.innerHTML += `<img src="${Compartido.bas64}" alt="Imagen"/>`;
                break;
            case 'texto':
                let codigo = btoa(Compartido.bas64)
                console.log("texto " + codigo)
                archivoVisor.innerHTML += `<textarea cols="80" rows="20">${codigo}</textarea>`;
                break;
        }
    } else {
        console.log("no hay compartidos")
    }
});
