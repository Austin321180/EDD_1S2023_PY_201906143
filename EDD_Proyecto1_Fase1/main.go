package main

import (
	"EDD_proyecto1_Fase1/EDD_Proyecto1_Fase1/edd"
	"bufio"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gen2brain/dlgs"
)

func main() {
	menu_login()
}

func menu_login() {
	salir := false
	opc := 0
	ld := &edd.Lista_Doble{}
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
			var usuario string
			contraseña := ""
			for !sal {
				fmt.Println("Ingresa usuario: ")
				fmt.Scanln(&usuario)
				fmt.Println("Ingresa contraseña: ")
				fmt.Scanln(&contraseña)
				usu := strings.ToLower(usuario)
				cont := strings.ToLower(contraseña)
				carnInt, err := strconv.Atoi(usuario)
				if err != nil {
					fmt.Println("canet equivocado")
				}

				if usu == "admin" && cont == "admin" {
					fmt.Println("Bienvenido", usu)
					administrador()
					break
				} else if ld.Ingresar(carnInt, contraseña) {
					estudiantes()
				} else {
					fmt.Println("Datos incorrectos")
					break
				}
			}
		case 2:
			salir = true
			fmt.Println("Salió de GoDrive")
		case 3:
			ld.MostrarDatos()
		}
	}
}

func administrador() {
	op := 0
	sal := false
	c := &edd.Cola{}
	ld := &edd.Lista_Doble{}
	p := &edd.Pila{}
	var (
		car   int
		contr string
		//nomb  string
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
					ld.Agregar(c.Primero.Carnet, c.Primero.Nombre, c.Primero.Contraseña)
					c.Desencolar()
					fmt.Println("")
					c.MostrarCola()
					p.Push(hora(), fecha(), true)
					p.GrafP(true)
					c.GrafC()
					ld.GrafLD()
					ld.Graf_Json()
				case 2:
					fmt.Println("Se rechazo estudiante")
					c.Desencolar()
					c.MostrarCola()
					c.GrafC()
					p.Push(hora(), fecha(), false)
					p.GrafP(false)
				case 3:
					s = true
				}
			}
		case 2:
			fmt.Println("**********Estudiantes del Sistema**********")
			ld.MostrarDatos()
		case 3:
			c.Encolar("Austin Alvarez", 201906143, "hola")
			leer := bufio.NewReader(os.Stdin)
			fmt.Println("-----------Ingreso de Estudiantes al Sistema------------")
			fmt.Scanln()
			fmt.Print("Ingrese el carnet: ")
			fmt.Scanln(&car)
			fmt.Print("Ingrese el nombre: ")
			nomb, err := leer.ReadString('\n')
			if err != nil {
				fmt.Println(err)
			}
			nomb = strings.TrimSpace(nomb)
			fmt.Print("Ingrese la contraseña: ")
			fmt.Scanln(&contr)
			c.Encolar(nomb, car, contr)
			c.GrafC()
			fmt.Println("--------------------------------------------------------")
			break
		case 4:
			fmt.Println("*********Carga Masiva**********************")
			abrirarchivo()
			c.GrafC()
		case 5:
			fmt.Println("Sesion Cerrada")
			sal = true
		}
	}
}

func estudiantes() {
	op := 0
	salir := false
	//ld := &edd.Lista_Doble{}
	for !salir {
		fmt.Println("inicio sesión")
		fmt.Println(hora(), fecha())
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
	c := edd.Cola{}

	file, _, er := dlgs.File("Seleccione un archivo CSV", "", false)
	if er != nil {
		fmt.Println("Error al abrir la ventana de diálogo:", er)
		return
	}

	f, er := os.Open(file)
	if er != nil {
		fmt.Println("Error al abrir el archivo:", er)
		return
	}
	defer f.Close()
	leer := csv.NewReader(f)

	_, err := leer.Read()
	//primera fila
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		col, er := leer.Read()
		if er != nil {
			if er.Error() == "EOF" {
				break
			}
			fmt.Println("error: ", er)
		}
		col1, er := strconv.Atoi(col[0])
		c.Encolar(col[1], col1, col[2])
		if er != nil {
			fmt.Println("error, ", er)
			return
		}
		fmt.Println(col[1], col1, col[2])

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
	//segundos
	if tiempo.Second() < 10 {
		final = final + "0" + strconv.Itoa(tiempo.Second()) + ":"
	} else {
		final = final + strconv.Itoa(tiempo.Second())
	}
	return final
}

func fecha() string {
	fech := time.Now()
	final := ""
	f := fmt.Sprintf("%d/%02d/%02d", fech.Day(), fech.Month(), fech.Year())
	final += f
	return final
}
