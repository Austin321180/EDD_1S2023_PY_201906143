package main

import "fmt"

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
			salir = true
		case 2:
			salir = true
			fmt.Println("Salió de GoDrive")
		}
	}
}
