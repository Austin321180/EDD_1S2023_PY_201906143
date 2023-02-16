package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println("hola")
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
			fmt.Println("**********Estudiantes Pendientes***********")
			break
		case 2:
			fmt.Println("**********Estudiantes del Sistema**********")
			break
		case 3:
			fmt.Println("**********Registro de Estudiantes**********")
			break
		case 4:
			fmt.Println("*********Carga Masiva**********************")
			break
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
