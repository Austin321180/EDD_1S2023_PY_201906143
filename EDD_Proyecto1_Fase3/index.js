import { encriptacion } from './EDD/Encriptacion.js';
import { Block } from './EDD/BlockChain.js';
import { TablaHash } from './EDD/TablaHash.js';
const bloque = new Block()
const tabla = new TablaHash()

const btnlogin = document.querySelector('.login')
btnlogin.addEventListener("click", login)
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