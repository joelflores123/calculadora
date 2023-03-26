class Calculadora {
    /*limpiador*/
    limpiar() {
            document.getElementById("valorestext").value = "", document.getElementById("valor2").value = "";
            document.getElementById("resp").textContent = "", document.getElementById("resp").value = "";
            document.getElementById("numero").value = "";
            document.getElementById("base1").value = "", document.getElementById("base2").value = "";
        }
        //FUNCION DE EJECUCION
    ejecucion(texto, respuesta) {
        respuesta.value = texto;
        console.log(respuesta);
    }

    //FUNCION MYSPLIT
    mySplit(cadena, separador) {
        let subcadenas = [];
        let separadorLength = separador.length;
        let startIndex = 0;

        for (let i = 0; i < cadena.length; i++) {
            if (cadena.substring(i, i + separadorLength) === separador) {
                subcadenas.push(cadena.substring(startIndex, i));
                startIndex = i + separadorLength;
            }
        }
        subcadenas.push(cadena.substring(startIndex));
        return subcadenas;
    }

    //FUNCIONES DE RETORNOS
    cambio_carcter(a, b, c) {
        for (let i = 0; i < a.length; i++) {
            if (c.length > 0) {
                c += b;
            }
            c += a[i];
        }
        return c;
    }
    isBuscado(a, b) {
        let pos = 0,
            enc = 0
            //[2,4,6]  4
        while (pos < a.length && enc == 0) {
            if (a[pos] == b) {
                enc = 1
            } else {
                pos += 1
            }
        }
        if (enc == 1) {
            return pos
        } else {
            return -1
        }
    }

    isPalabras(a) {
        let cp = 1;
        a = this.quitaEspacio(a); // eliminamos los espacios en blanco

        for (let pos = 0; pos < a.length; pos++) {
            if (a[pos] == ' ' && a[pos + 1] != ' ') {
                cp += 1;
            }
        }

        return cp;
    }
    quitaEspacio(a) {
        let sinEspacio = ""
        a = a.trim()
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== ' ') {
                sinEspacio += a[i]
            }
        }
        return sinEspacio
    }
    insertaElemento(a, b) {
        const c = this.quitaElemento(a, b).slice();
        c.push(b);
        c.sort((x, y) => x - y); // Ordena el arreglo de menor a mayor
        return c;
    }
    quitaElemento(a, b) {
        const pos = this.isBuscado(a, b); // Obtiene la posición del elemento b en el arreglo a
        if (pos === -1) { // Si el elemento no se encuentra en el arreglo, retorna el arreglo original
            return a;
        }
        const resultado = []; // Crea un nuevo arreglo para almacenar el resultado
        for (let i = 0; i < a.length; i++) { // Recorre el arreglo a
            if (i !== pos) { // Si la posición actual no es la posición del elemento b
                resultado.push(a[i]); // Agrega el elemento actual al arreglo resultado
                resultado.sort((x, y) => x - y); // Ordena el arreglo de menor a mayor
            }
        }
        return resultado; // Retorna el arreglo resultado sin el elemento b
    }

    isExponente(a, b) {
        let res = 1
        for (let i = 1; i <= b; i++) {
            res *= a
        }
        return res
    }
    isDigitos(a, b) {
        let digitos = []
        while (a > 0) {
            digitos.push(a % b)
            console.log(digitos)
            a = parseInt(a / b)
        }
        return digitos
    }

    calcularDenominaciones(a, b) {
        let j = []

        for (let i = 0; i < b.length; i++) {
            let d = b[i];
            let c = Math.floor(a / d);

            if (c > 0) {
                j.push(`\n${c} :: $${d}`);
                a -= c * d;
            }
        }

        if (j.length === 0) {
            return "Tu vuelto es de $0 billetes";
        }

        return j;
    }

    resto_divide(a, b, c, d, numero) {

        let u = a[numero % 10];
        let de = b[Math.floor(numero / 10) % 10];
        let ct = c[Math.floor(numero / 100) % 10];
        let dm = d[Math.floor(numero / 1000) % 10];

        return dm + ct + de + u;
    }

    sumarDigitos(a) {
        let suma = 0;
        while (a > 0) {
            suma += a % 10;
            a = Math.floor(a / 10);
        }
        return suma;
    }

    /**EJERCICIOS */
    base10_2() {
        const valores = document.getElementById("valorestext");
        const numero = parseInt(valores.value);
        const $respuesta = document.getElementById("resp");
        let arreglo = this.isDigitos(numero, 2)
        let base2 = ""
        for (let i = arreglo.length - 1; i >= 0; i--) {
            base2 = base2 + arreglo[i].toString()
        }
        this.ejecucion(`[Base10=${numero}]\nBase2=${base2}`, $respuesta)

    }

    base2_10() {
        const valores = document.getElementById("valorestext");
        const numero = parseInt(valores.value);
        const $respuesta = document.getElementById("resp");
        let arreglo = this.isDigitos(numero, 10)
        let base10 = 0,
            limite = arreglo.length - 1
        for (let i = arreglo.length - 1; i >= 0; i--) {
            base10 = base10 + arreglo[i] * this.isExponente(2, limite)
            limite = limite - 1
        }
        this.ejecucion(`[Base2=${numero}]\nBase10=${base10}`, $respuesta)
    }
    base10_8() {
        const valores = document.getElementById("valorestext");
        const numero = parseInt(valores.value);
        const $respuesta = document.getElementById("resp");
        let arreglo = this.isDigitos(numero, 8)
        let base8 = 0;

        for (let i = arreglo.length - 1; i >= 0; i--) {
            base8 = Math.floor(base8 + arreglo[i].toString())
        }
        this.ejecucion(`[Base10=${numero}]\nBase8=${base8}`, $respuesta)
    }
    base10_16() {
        const valores = document.getElementById("valorestext");
        const numero = parseInt(valores.value);
        const $respuesta = document.getElementById("resp");
        let arreglo = this.isDigitos(numero, 16)

        for (let i = 0; i <= numero; i++) {
            if (numero <= 9) {
                // Agregar el dígito a la cadena base16
                arreglo = numero;
            } else {
                arreglo = i.toString(16).toUpperCase();
            }
        }
        this.ejecucion(`[Base10=${numero}]\nBase16=${arreglo}`, $respuesta)
    }
    base2_16() {
        const valores = document.getElementById("valorestext");
        const numero = parseFloat(valores.value);
        const $respuesta = document.getElementById("resp");
        let base10 = parseInt(numero, 2);
        let digitos = this.isDigitos(base10, 16);
        let base16 = "";

        for (let i = digitos.length - 1; i >= 0; i--) {
            base16 += digitos[i].toString(16).toUpperCase();
        }
        this.ejecucion(`[Base10=${numero}]\nBase16=${base16}`, $respuesta);
    }

    base2_8() {
        const valores = document.getElementById("valorestext");
        const numero = parseFloat(valores.value);
        const $respuesta = document.getElementById("resp");

        // Convertimos el número binario a base 10
        let base10 = parseInt(numero, 2);

        // Obtenemos los dígitos en base 8
        let digitosBase8 = this.isDigitos(base10, 8);

        // Convertimos los dígitos de base 8 a una cadena para mostrar la respuesta
        let base8 = "";

        for (let i = digitosBase8.length - 1; i >= 0; i--) {
            base8 += digitosBase8[i].toString();
        }

        this.ejecucion(`[Base2=${numero}]\nBase8=${base8}`, $respuesta)
    }
    darVuelto() {
        const costo = parseInt(document.getElementById("valor2").value);
        const $respuesta = document.getElementById("resp");
        let cambio = this.calcularDenominaciones(costo, [100, 50, 20, 10, 5, 1]);

        this.ejecucion(`[El costo es: $${costo}]\n  Tu cambio en billetes es: ${cambio}`, $respuesta);
    }
    romano() {
        const valores = document.getElementById("valorestext");
        const numero = parseInt(valores.value);
        const $respuesta = document.getElementById("resp");

        // Convertir el número a su equivalente en número romano
        let romanos = this.resto_divide(["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], ["", "M", "MM", "MMM"], numero);

        // Validar que el número esté en el rango correcto
        if (numero < 1 || numero > 3999) {
            this.ejecucion(`El número debe estar entre 1 y 3999`, $respuesta);
            return;
        }

        this.ejecucion(`El numero es: ${numero}\n  Convertido a ROMANO es: ${romanos}`, $respuesta);
    }
    busca_cadena() {
        const cadena = document.getElementById("valorestext").value.trim();
        const subcadena = document.getElementById("valor2").value;
        const $respuesta = document.getElementById("resp");
        let enc = [];
        let pos = 0;
        let repeticiones = 0;
        let frase = this.quitaEspacio(cadena);

        while (pos < frase.length) {
            if (frase.slice(pos, pos + subcadena.length) == subcadena) {
                enc.push(pos + 1);
                repeticiones++;
            }
            pos++;
        }
        this.ejecucion(`La palabra es: ${frase}\n La subcadena es: ${subcadena} \n La poscicion es: ${enc}`, $respuesta);
    }
    mayor_elemento() {
        const valores = document.getElementById("valorestext").value;
        const numero = this.mySplit(valores, ",").map(valor => Math.abs(parseInt(valor.trim()))); // Convertir valores a positivos con Math.abs()
        let mayor = numero[0];
        const $respuesta = document.getElementById("resp");

        for (let i = 0; i < numero.length; i++) {
            if (numero[i] > mayor) {
                mayor = numero[i];
            }
        }

        this.ejecucion(`La serie es: ${numero}\n El mayor elemento es: ${mayor}`, $respuesta);
    }
    menor_elemento() {
        const valores = document.getElementById("valorestext").value;
        const numero = this.mySplit(valores, ",").map(valor => Math.abs(parseInt(valor.trim()))); // Convertir valores a positivos con Math.abs()
        let menor = numero[0];
        const $respuesta = document.getElementById("resp");

        for (let i = 0; i < numero.length; i++) {
            if (numero[i] < menor) {
                menor = numero[i];
            }
        }
        this.ejecucion(`La serie es: ${numero}\n El menor elemento es ${menor}`, $respuesta);
    }
    convertirBase() {
        const numero = parseInt(document.getElementById('numero').value);
        const baseOrigen = parseInt(document.getElementById('base1').value);
        const baseDestino = parseInt(document.getElementById('base2').value);
        let decimal = parseInt(numero, baseOrigen);
        const $respuesta = document.getElementById("resp");

        if (isNaN(numero) || isNaN(baseOrigen) || isNaN(baseDestino)) {
            this.ejecucion('Por favor ingrese números válidos', $respuesta);
            return;
        }

        let resultado_basedestino = decimal.toString(baseDestino).toUpperCase();
        console.log(resultado_basedestino)

        this.ejecucion(`El numero ingresado es: ${numero}\n Su base inical es: ${baseOrigen}\n La base destino es: ${baseDestino} \n La converción es: ${resultado_basedestino}`, $respuesta);
        return resultado_basedestino;
    }


    buscaArreglo() {
        const valores = document.getElementById("valorestext").value;
        const buscado = document.getElementById("valor2").value;
        const numero = this.mySplit(valores, ",").map(valor => parseInt(valor.trim()));
        const numero_buscado = parseInt(buscado.trim()); // Convertir valor a positivo con Math.abs()
        let enc = [];
        const $respuesta = document.getElementById("resp");
        let busqueda = this.isBuscado(numero, numero_buscado)

        if (busqueda >= 0) {
            enc.push(busqueda);
            this.ejecucion(`La serie es: ${numero}\n El número buscado es ${numero_buscado}\n EL elemento buscado se encuentra en la posición: ${enc}`, $respuesta);
        } else {
            this.ejecucion(`¡El elemento buscado no se encuentra en la serie!.....`, $respuesta);
        }
    }
    elimina_elemento() {
        const valores = document.getElementById("valorestext").value;
        const buscado = document.getElementById("valor2").value;
        const numero = this.mySplit(valores, ",").map(valor => parseInt(valor.trim()));
        const numero_buscado = parseInt(buscado.trim());
        let elementos_soloElemento = this.quitaElemento(numero, numero_buscado);
        const $respuesta = document.getElementById("resp");

        if (elementos_soloElemento.length > 0) {
            this.ejecucion(`La serie es: ${numero}\n El elemento a eliminar es: ${numero_buscado}\n La serie con el numero eliminado es: ${elementos_soloElemento}`, $respuesta);
        } else {
            this.ejecucion(`¡El elemento buscado no se encuentra en la serie para eliminarlo!.....`, $respuesta);
        }
    }
    inserta_elemento() {
        const valores = document.getElementById("valorestext").value;
        const buscado = document.getElementById("valor2").value;
        const numero = this.mySplit(valores, ",").map(valor => parseInt(valor.trim()));
        let numero_insertado = parseInt(Math.abs(buscado.trim()));
        let elementos_serie_con_insertado = this.insertaElemento(numero, numero_insertado);
        const $respuesta = document.getElementById("resp");

        this.ejecucion(`La serie es: ${valores}\n El elemento a insertar es: ${buscado}\n La serie con el numero insertado es: ${elementos_serie_con_insertado}`, $respuesta);
    }
    cadena_arreglo() {
        // Obtenemos los valores de los elementos de entrada y los convertimos en un arreglo de números
        let valores = document.getElementById("valorestext").value;
        let caracter = document.getElementById("valor2").value;
        let numero = this.mySplit(valores, ";").map(valor => parseInt(valor.trim()));
        let $respuesta = document.getElementById("resp");
        let numeros = [];
        let car_reemplazo = caracter[0];
        // Reemplazamos el carácter de separación en la serie con el carácter de reemplazo
        let serie_reemplazada = this.cambio_carcter(numero, caracter, "");
        // Eliminamos los elementos que coinciden con el carácter de reemplazo
        for (let i = 0; i < numero.length; i++) {
            if (numero[i] != car_reemplazo) {
                numeros.push(numero[i]);
            }
        }
        this.ejecucion(`La cadena es: ${valores} \nEl Caracter es: ${car_reemplazo}\n EL arreglo resultante remplazado seria: [${serie_reemplazada}]`, $respuesta);
    }
    arreglo_cadena() {
        // Obtenemos los valores de los elementos de entrada y los convertimos en un arreglo de números
        const valores = document.getElementById("valorestext").value;
        const caracter = document.getElementById("valor2").value;
        const numero = this.mySplit(valores, ",").map(valor => parseInt(valor.trim()));
        const $respuesta = document.getElementById("resp");
        let cadena = this.cambio_carcter(numero, caracter, "");

        // Convertimos los valores del arreglo en una cadena separada por el carácter indicado
        this.ejecucion(`El arreglo es: [${numero}] \nEl Caracter es: ${caracter}\n La cadena resultante sería: ${cadena}`, $respuesta);
    }
    cont_caracteres() {
        // Obtenemos los valores de los elementos de entrada y los convertimos en un arreglo de números
        let cadena = document.getElementById("valorestext").value;
        let $respuesta = document.getElementById("resp");
        let ca_comas = 0;
        let ca_puntos = 0;
        let ca_puntoycoma = 0;
        let ca_dospuntos = 0;

        /* swicht evalua cada caso en caso no ser verdadero pasa al siguiente con el break que rompe ciclo*/
        for (let i = 0; i < cadena.length; i++) {
            /*switch (cadena[i]) {
                case ",":
                    ca_comas++;
                    break;
                case ".":
                    ca_puntos++;
                    break;
                case ";":
                    ca_puntoycoma++;
                    break;
                case ":":
                    ca_dospuntos++

            } */
            if (cadena[i] === ",") {
                ca_comas++;
            } else if (cadena[i] === ".") {
                ca_puntos++;
            } else if (cadena[i] === ";") {
                ca_puntoycoma++;
            } else if (cadena[i] === ":") {
                ca_dospuntos++;
            }
        }
        this.ejecucion(`La cadena: ${cadena}\n tiene:\n${ca_comas} comas,\n${ca_puntos} puntos,\n${ca_puntoycoma} punto y coma,\n${ca_dospuntos} dos puntos.`, $respuesta)
    }
    arreglo_palabras() {
        const cadena = document.getElementById("valorestext").value;
        const $respuesta = document.getElementById("resp");
        const palabras = this.mySplit(cadena, " ");
        const palabrasConvertidas = [];

        for (let i = 0; i < palabras.length; i++) {
            if (palabras[i] !== "") {
                const primeraLetra = palabras[i][0].toUpperCase();
                const restoPalabra = palabras[i].substring(1);
                const palabraConvertida = primeraLetra + restoPalabra;
                palabrasConvertidas.push(palabraConvertida);
            }
        }

        const cadenaConvertida = palabrasConvertidas.join(" ");
        if (this.isPalabras(cadena) > 0) {
            this.ejecucion(`La cadena es: ${cadena}\nLa cadena convertida es: ${cadenaConvertida}`, $respuesta)
        }
    }
    suma_digitos() {
        const valores = parseInt(document.getElementById("valorestext").value);
        const $respuesta = document.getElementById("resp");
        let digitos = "";
        let numero = valores;
        let sum = this.sumarDigitos(numero);

        while (numero > 0) {
            let digito = numero % 10;
            digitos += digito + ",";
            numero = Math.floor(numero / 10);
        }
        digitos = digitos.slice(0, -1);
        this.ejecucion(`EL NUMERO ES: ${valores}\nTUS DIGITOS DEL NUMERO INGRESADO ES: ${digitos}\n LA SUMA DE LOS DIGITOS ES: ${sum} `, $respuesta);
    }
}
/* let base8 = parseInt(numero, 2).toString(8); */


//LLAMADOS A LAS FUNCIONES A EJECUTAR
let cal = new Calculadora();
cal.base10_2();
cal.base10_8();
cal.base10_16();
cal.base2_10();
cal.base2_16();
cal.base2_8();
cal.darVuelto();
cal.busca_cadena();
cal.mayor_elemento();
cal.convertirBase();
cal.menor_elemento();
cal.buscaArreglo();
cal.elimina_elemento();
cal.inserta_elemento();
cal.cadena_arreglo();
cal.arreglo_cadena();
cal.arreglo_palabras()
cal.suma_digitos();
cal.cont_caracteres();
/*limpiar*/
cal.limpiar();

/*limpiar*/
document.getElementById("btn-limpiar").addEventListener("click", function() {
    cal.limpiar()

});

//VALIDACION DE BOTON DE BASE A BASE
//VALIDACION DE BOTON DE BASE A BASE
const base2Input = document.getElementById("base2");
const base1Input = document.getElementById("base1");
const numeroInput = document.getElementById("numero");
const errorMsg = document.getElementById("error-msg");

function validar() {
    const base2 = parseInt(base2Input.value);
    const base1 = parseInt(base1Input.value);
    const numero = parseInt(numeroInput.value, base1);

    if (isNaN(base2) || isNaN(base1) || isNaN(numero) || base2 <= 0 || base1 <= 0 || numero <= 0 || (base2 < 2 || base2 > 16) || (base1 < 2 || base1 > 16) || (numero < 0)) {
        errorMsg.innerHTML = "Ingrese valores válidos y asegúrese de que la base de inicio, la base destino y el número estén en el rango correcto";
        errorMsg.style.display = "block";
        setTimeout(function() {
            errorMsg.style.display = "none";
        }, 3000);
        return false;

    }
    return true;

}

//VALIDACION DE LOS INPUTS Y EL TEXTAREA
const valorestext = document.getElementById('valorestext');
const valor2 = document.getElementById('valor2');
const mensajeSerie = document.getElementById('mensaje-serie');
const mensajeValor = document.getElementById('mensaje-valor');

// Validar que solo se ingresen números, letras y caracteres especiales
valorestext.addEventListener('input', function() {
    if (!/^[a-zA-Z0-9\s\.\,\-\_\#\!\$\%\&\*\(\)\+\;\:\'\"\¿\?\¡\[\]\{\}\<\>\/\\\|\@\^\~\`\s]+$/.test(this.value)) {
        mensajeSerie.textContent = 'Solo se aceptan números, letras y caracteres especiales';
        mensajeSerie.style.display = "block";
        setTimeout(function() {
            mensajeSerie.style.display = "none";
        }, 3000); // 3 segundos
    } else {
        mensajeSerie.style.display = "none";
    }
});

// Validar que solo se ingresen números, letras y caracteres especiales
valor2.addEventListener('input', function() {
    if (!/^[a-zA-Z0-9\s\.\,\-\_\#\!\$\%\&\*\(\)\+\;\:\'\"\¿\?\¡\[\]\{\}\<\>\/\\\|\@\^\~\`\s]+$/.test(this.value)) {
        mensajeValor.textContent = 'Solo se aceptan números, letras y caracteres especiales';
        mensajeValor.style.display = "block";
        setTimeout(function() {
            mensajeValor.style.display = "none";
        }, 3000); // 3 segundos
    } else {
        mensajeValor.style.display = "none";
    }
});