package main

import (
	"EDD_proyecto1_Fase1/EDD_Proyecto1_Fase1/edd"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gen2brain/dlgs"
)

func main() {
	salir := false
	opc := 0
	for !salir {
		fmt.Println("**********GoDrive***********")
		fmt.Println("*1.Iniciar sesion          *")
		fmt.Println("*2.Salir de GoDrive        *")
		fmt.Println("****************************")
		fmt.Println("Eligir opción: ")
		fmt.Scanln(&opc)
		switch opc {
		case 1:
			sal := false
			usuario := ""
			contraseña := ""
			for !sal {
				fmt.Println("Ingresa usuario: ")
				fmt.Scanln(&usuario)
				fmt.Println("Ingresa contraseña: ")
				fmt.Scanln(&contraseña)
				usu := strings.ToLower(usuario)
				cont := strings.ToLower(contraseña)
				if usu == "admin" && cont == "admin" {
					administrador()
					break
				} else {
					fmt.Println("no coinciden los datos")
					break
				}
			}
		case 2:
			salir = true
			fmt.Println("Salió de GoDrive")
		}
	}
}

func administrador() {
	op := 0
	sal := false
	c := edd.Cola{}
	ld := edd.Lista_Doble{}
	p := edd.Pila{}
	var (
		car   int
		contr string
		nomb  string
		//apellido string
	)
	for !sal {
		fmt.Println("********************Administrador GoDrive*****************")
		fmt.Println("*1 Ver estudiantes pendientes                            *")
		fmt.Println("*2 ver estudiantes del sistema                           *")
		fmt.Println("*3 Registrar nuevo estudiante                            *")
		fmt.Println("*4 Carga masiva de estudiantes                           *")
		fmt.Println("*5 Cerrar sesion                                         *")
		fmt.Println("**********************************************************")
		fmt.Println("Elija su opcion: ")
		fmt.Scan(&op)
		switch op {
		case 1:
			fmt.Println("---------Estudiantes Pendientes-------------")
			c.MostrarCola()
			opc := 0
			s := false
			for !s {
				fmt.Println("1. Aceptar Estudiante ")
				fmt.Println("2. Rechazar Estudiante")
				fmt.Println("3. Volver")
				fmt.Println("--------------------------------------------")
				fmt.Println("Elija su opcion: ")
				fmt.Scan(&opc)
				switch opc {
				case 1:
					fmt.Println("")
					fmt.Println("se acepto a: ", c.Primero.Nombre)
					fmt.Println("")
					ld.Agregar(c.Primero.Carnet, c.Primero.Nombre, c.Primero.Contraseña)
					c.Desencolar()
					fmt.Println("")
					c.MostrarCola()
					p.Push(hora(), fecha())
					p.MostrarPila()
				case 2:
					c.Desencolar()
					break
				case 3:
					s = true
				}
			}
		case 2:
			fmt.Println("**********Estudiantes del Sistema**********")
			c.Encolar("Austin Alvarez", 201906143, "hola")
			break
		case 3:
			fmt.Println("-----------Ingreso de Estudiantes al Sistema------------")
			fmt.Print("Ingrese el carnet: ")
			fmt.Scan(&car)
			fmt.Print("Ingrese el nombre: ")
			fmt.Scan(&nomb)
			//nombrecompleto := fmt.Sprintf("%s %s", &nomb, &apellido)
			fmt.Print("Ingrese la contraseña: ")
			fmt.Scan(&contr)
			c.Encolar(nomb, car, contr)
			fmt.Println("Se guardo correctamente ", car)
			fmt.Println("--------------------------------------------------------")
			break
		case 4:
			fmt.Println("*********Carga Masiva**********************")
			abrirarchivo()
		case 5:
			fmt.Println("Sesion Cerrada")
			sal = true
		}
	}
}

func estudiantes() {
	op := 0
	salir := false
	for !salir {
		fmt.Println("Nombre: ")
		fmt.Println("fecha:  ")
		fmt.Println("Hora:  ")
		fmt.Println("Numero inicio de sesion: ")
		fmt.Println("1 Cerrar sesion")
		fmt.Scanln(&op)
		switch op {
		case 1:
			fmt.Println("Salio de la sesion ")
			salir = true
		}
	}
}

func abrirarchivo() {
	// Abrir la ventana de diálogo para seleccionar un archivo CSV
	file, _, err := dlgs.File("Seleccione un archivo CSV", "", false)
	if err != nil {
		fmt.Println("Error al abrir la ventana de diálogo:", err)
		return
	}

	// Abrir el archivo CSV
	f, err := os.Open(file)
	if err != nil {
		fmt.Println("Error al abrir el archivo:", err)
		return
	}
	defer f.Close()

	// Crear un lector de CSV
	reader := csv.NewReader(f)

	// Saltar la primera línea (encabezado)
	if _, err := reader.Read(); err != nil {
		fmt.Println("Error al leer la primera línea:", err)
		return
	}

	// Leer los datos línea por línea
	for {
		record, err := reader.Read()
		if err != nil {
			fmt.Println("Error al leer el archivo:", err)
			break
		}
		fmt.Println(record)
	}
}

func hora() string {
	tiempo := time.Now()
	final := ""
	//horas
	if tiempo.Hour() < 10 {
		final = final + "0" + strconv.Itoa(tiempo.Hour()) + ":"
	} else {
		final = final + strconv.Itoa(tiempo.Hour()) + ":"
	}
	//minutos
	if tiempo.Minute() < 10 {
		final = final + "0" + strconv.Itoa(tiempo.Minute()) + ":"
	} else {
		final = final + strconv.Itoa(tiempo.Minute()) + ":"
	}
	return final
}

func fecha() string {
	fech := time.Now()
	return fech.Format("2023/01/19")
}
