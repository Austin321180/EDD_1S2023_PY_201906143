import { desencriptacion, encriptacion } from './Encriptacion.js'

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

class Block {
    constructor() {
        this.inicio = null
        this.bloques_creados = 0
    }

    async insertarBloque(fecha, emisor, receptor, mensaje) {
        let mensajes = JSON.parse(localStorage.getItem("Mensajes")) || []
        if (this.inicio === null) {
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let mensajedesEncriptado = await desencriptacion(mensajeEncriptado)
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha, emisor, receptor, mensajeEncriptado, '0000', hash)

            this.inicio = nuevoBloque
            mensajes.push({
                Bloques: this.bloques_creados,
                Fecha: fecha,
                Emisor: emisor,
                Recpetor: receptor,
                Mensaje: mensajeEncriptado,
                Hash: '0000',
                Hash2: hash,
                Desencriptado: mensajedesEncriptado,
                tipo: "BlockChain"
            })
            localStorage.setItem("Mensajes", JSON.stringify(mensajes))
            this.bloques_creados++
        } else {
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let mensajedesEncriptado = await desencriptacion(mensajeEncriptado)
            let aux = this.inicio
            while (aux.siguiente) {
                aux = aux.siguiente
            }
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha, emisor, receptor, mensajeEncriptado, aux.valor['hash'], hash)
            nuevoBloque.anterior = aux
            aux.siguiente = nuevoBloque
            mensajes.push({
                Bloques: this.bloques_creados,
                Fecha: fecha,
                Emisor: emisor,
                Receptor: receptor,
                Mensaje: mensajeEncriptado,
                Hash: aux.valor['hash'],
                Hash2: hash,
                Desencriptado: mensajedesEncriptado,
                tipo: "BlockChain"
            });
            localStorage.setItem("Mensajes", JSON.stringify(mensajes))
            this.bloques_creados++
        }
    }

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
}

export { Block }