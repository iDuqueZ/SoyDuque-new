---
layout: ../../layouts/Postlayout.astro
pubDate: 2024-22-03
title: 'JavaScript: Apuntes de clase'
description: 'Estos son mis apuntes de estudio sobre JavaScript conceptos básicos'
author: 'Ivan D Duque'
image:
    url: '/post/js.jpg'
    alt: 'Apuntes JS'
tags: ["Anotaciones", "JavaScript", "Desarrollo Web"]
---

## ¿Qué es JS y para qué sirve?

¿Cómo nace Javascript? Nace con la necesidad de generar dinamismo en las páginas web y que a su vez los usuarios y las empresas pudieran interactuar unos con otros. ¿Qué es Javascript? Es un lenguaje interpretado, orientado a objetos, débilmente tipado y dinámico. Débilmente tipado Se pueden hacer operaciones entre tipos distintos de datos (enteros con strings, booleanos con enteros, etc). Ejemplo:


```
4 + 7 // 47
4 * 7 // 28
2 + true; // 3
false - 3; // -3
```

**Dinámico** Corre directamente en la etapa de Runetime sin una etapa de compilación previa. Esto permite probar nuestro código inmediatamente; pero también es lo que hace que los errores se muestren hasta que se ejecuta el programa. ¿Realmente es Javascript un lenguaje interpretado? Si, y la razón es que le navegador lee linea por linea nuestro código el cuál le indica lo que tiene que hacer, sin la necesidad de compilar. Todo esto es controlado por el motor de Javascript V8 del navegador Javascript es Basckwards Compatible Todas las funciones nuevas que salen de Javascript no dañarán el trabajo ya hecho, pero no se podrá utilizar en nuestro entorno de trabajo inmediatamente. Para solucionar esto está 
**Babel** que permite utilizar las nuevas características del lenguaje pero lo transforma a una versión que el navegador pueda entender.

## Elementos de un Lenguaje de Programación: Variables, Funciones y Sintaxis

![Tipos de variables](/post/c094cc55cdb19ffd5a046a7f77a66f4c.png)

## Tipos de variables

En JavaScript, las variables se utilizan para almacenar datos y se pueden dividir en varios tipos según sus características y comportamiento. Aquí te explicaré los tipos de variables más comunes en JavaScript y sus características:

1. **Variables de tipo Number (Número):**
   - Almacenan valores numéricos, ya sean enteros o de punto flotante.
   - Ejemplos:
     ```javascript
     let edad = 25;
     let precio = 10.99;
     ```

2. **Variables de tipo String (Cadena):**
   - Almacenan texto, que puede ser cualquier combinación de caracteres entre comillas simples (''), comillas dobles ("") o comillas invertidas (``).
   - Ejemplos:
     ```javascript
     let nombre = 'Juan';
     let mensaje = "Hola, ¿cómo estás?";
     ```

3. **Variables de tipo Boolean (Booleano):**
   - Solo pueden contener dos valores: `true` (verdadero) o `false` (falso).
   - Se utilizan para representar valores de verdad o falsedad.
   - Ejemplo:
     ```javascript
     let esMayorDeEdad = true;
     ```

4. **Variables de tipo Array (Arreglo):**
   - Almacenan una lista ordenada de valores que pueden ser de cualquier tipo, incluyendo otros arreglos.
   - Se acceden a los elementos mediante un índice numérico, comenzando desde 0.
   - Ejemplo:
     ```javascript
     let colores = ['rojo', 'verde', 'azul'];
     ```

5. **Variables de tipo Object (Objeto):**
   - Almacenan datos estructurados en pares clave-valor.
   - Las claves son cadenas y los valores pueden ser de cualquier tipo.
   - Ejemplo:
     ```javascript
     let persona = {
       nombre: 'Ana',
       edad: 30,
       casado: false
     };
     ```

6. **Variables de tipo Undefined (Indefinido):**
   - Cuando se declara una variable pero no se le asigna ningún valor, su valor es `undefined`.
   - Ejemplo:
     ```javascript
     let variableNoDefinida;
     ```

7. **Variables de tipo Null (Nulo):**
   - Se utiliza para indicar que una variable no tiene ningún valor o representa la ausencia de un objeto.
   - Es un valor que se debe asignar explícitamente.
   - Ejemplo:
     ```javascript
     let miVariable = null;
     ```

8. **Variables de tipo Symbol (Símbolo):**
   - Se utilizan para crear valores únicos e inmutables que se pueden utilizar como claves en objetos.
   - Se crean utilizando la función `Symbol()`.
   - Ejemplo:
     ```javascript
     const simbolo = Symbol('miSimbolo');
     ```

9. **Variables de tipo Function (Función):**
   - Pueden almacenar funciones, que son bloques de código reutilizable.
   - Pueden ser llamadas y ejecutadas.
   - Ejemplo:
     ```javascript
     function saludar(nombre) {
       console.log(`Hola, ${nombre}!`);
     }
     ```

Estos son los tipos de variables más comunes en JavaScript. Es importante recordar que JavaScript es un lenguaje de tipado dinámico, lo que significa que una variable puede cambiar de tipo durante la ejecución del programa si se le asigna un valor de otro tipo.

En JavaScript, `var`, `let`, y `const` son tres formas de declarar variables, y cada una tiene diferentes alcances y características. Aquí te explico las diferencias entre ellas:

1. **var:**
   - `var` fue la forma original de declarar variables en JavaScript, y se utiliza en versiones anteriores de ECMAScript (ES5 y anteriores).
   - Las variables declaradas con `var` tienen un alcance de función (function scope), lo que significa que solo son visibles dentro de la función en la que se declaran.
   - Las variables declaradas con `var` se izan (hoisting), lo que significa que son movidas al principio de la función o ámbito en el que se declaran, pero su valor permanece indefinido hasta que se les asigna uno.
   - Ejemplo:
     ```javascript
     function ejemploVar() {
       if (true) {
         var x = 10;
       }
       console.log(x); // x es visible aquí
     }
     ```

2. **let:**
   - `let` fue introducido en ECMAScript 6 (ES2015) y se convirtió en la forma preferida de declarar variables en JavaScript.
   - Las variables declaradas con `let` tienen un alcance de bloque (block scope), lo que significa que son visibles solo dentro del bloque en el que se declaran, ya sea dentro de una función, un bucle, una declaración `if`, entre otros.
   - Las variables declaradas con `let` no se izan, por lo que no se pueden acceder antes de su declaración en el código.
   - Ejemplo:
     ```javascript
     function ejemploLet() {
       if (true) {
         let y = 20;
       }
       console.log(y); // Genera un error, y no es visible aquí
     }
     ```

3. **const:**
   - `const` también fue introducido en ECMAScript 6 (ES2015), y se utiliza para declarar variables cuyos valores no cambiarán una vez asignados.
   - Las variables declaradas con `const` también tienen un alcance de bloque (block scope), al igual que las variables declaradas con `let`.
   - Deben asignarse un valor en el momento de la declaración, y ese valor no puede cambiar posteriormente.
   - Ejemplo:
     ```javascript
     const PI = 3.14159;
     PI = 3.14; // Genera un error, no se puede cambiar el valor de una variable constante
     ```

En resumen, se recomienda utilizar `let` para la mayoría de las variables, ya que proporciona un alcance de bloque y evita problemas de hoisting. Se debe utilizar `const` para declarar variables que no cambian de valor, como constantes. El uso de `var` se ha vuelto menos común debido a sus implicaciones de alcance y hoisting, y es preferible usar `let` y `const` en su lugar.

Claro, aquí tienes ejemplos que ilustran algunas de las diferencias clave entre `var` y `let` en JavaScript:

**Diferencia 1: Alcance de función vs. alcance de bloque:**

```javascript
// Con var, la variable 'i' tiene alcance de función
for (var i = 0; i < 5; i++) {
  // ...
}
console.log(i); // Devuelve 5

// Con let, la variable 'j' tiene alcance de bloque
for (let j = 0; j < 5; j++) {
  // ...
}
console.log(j); // Genera un error, 'j' no está definida
```

**Diferencia 2: Hoisting:**

```javascript
// Con var, la declaración de la variable se "iza" al principio del ámbito
console.log(x); // Devuelve 'undefined'
var x = 10;

// Con let, no se "iza" la declaración de la variable
console.log(y); // Genera un error, 'y' no está definida
let y = 20;
```

**Diferencia 3: Redefinición de variables:**

```javascript
// Con var, puedes redeclarar la misma variable en el mismo ámbito
var a = 5;
var a = 10; // No genera error

// Con let, no puedes redeclarar la misma variable en el mismo ámbito
let b = 5;
let b = 10; // Genera un error
```

Estos ejemplos ilustran algunas de las diferencias clave entre `var` y `let`. En general, `let` se prefiere para la mayoría de las situaciones debido a su alcance de bloque y su comportamiento más predecible, mientras que `var` a menudo conduce a comportamientos inesperados y se utiliza con menos frecuencia en el código moderno de JavaScript.

## Funciones

Las funciones son las tareas que va a llevar a cabo el navegador. Existen 2 tipos de funciones 1) Declarativas 2) De expresión Ambas pueden llevar parámetros, que son los datos que necesitan para ejecutarse. Cada parámetro va separado por una coma. Cada instrucción que tenga la función debe terminar con ; . Si queremos que una función nos dé un numero o dato tenemos que usar la siguiente sintaxis:

return El dato que queremos que nos dé;


Las funciones declarativas tienen la siguiente sintaxis:

```
function Nombre de la función (Parámetros de la función) {Instrucciones}
```


Un ejemplo de una función puede ser una suma:

```
_ function suma (a,b) {return a+b;}_
```


Las funciones de expresión son aquellas que guardamos en una variable, por lo tanto, no es necesario nombrarlas y tienen la siguiente sintaxis:

```
_var Nombre de la variable = function(Parametros){Instrucciones}. _
```

Un ejemplo de una función de expresión sería:

```
var suma = function(a,b){return a+b;}
```


Para ejecutar las funciones debemos usar la siguiente sintaxis:
_Nombre de la funcion(Parametros función); _

Si la función no tiene ningún parámetro, únicamente se escribe:

_Nombre de la función(); _

## Que es el DOM? (Document Object Model. por sus siglas en inglés)

El DOM es una representación del documento HTML como un grupo de nodos y objetos. Determinando así la forma en la cual se puede acceder y modificar la estructura, contenido y estilo de un documento HTML. En palabras mas sencillas el DOM le dice a un programa como JavaScript que nodo o parte del HTML esta leyendo (como puede ser un párrafo o un titulo o una sección, etc.) y es el mismo DOM el que modela como un objeto (con sus propiedades y métodos) esa parte del documento. Con JS se accede a esas propiedades y se invoca esos métodos para modificar, eliminar, crear, etc. elementos en una pagina web.

Por lo menos esa es la forma en la cual lo entiendo por ahora. Lo comparto porque me parece importante y quizá alguien mas tenga la duda. Pueden encontrar una definición formal y mejor estructurada en: https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction

Si alguien tiene una mejor explicación le agradecería la pueda compartir, para ayudar a entender mejor de que nos hablan cuando mencionan el DOM.

## Escribir HTML desde Javascript


1. `innerHTML`

   Inserta código HTML en tu HTML

   ```javascript
   // Sintaxis:
   elemento.innerHTML = 'Nuevo texto';
   ```

2. `innerText`

   Inserta texto plano en tu HTML

   ```javascript
   // Sintaxis:
   elemento.innerText = 'Nuevo texto';
   ```

3. `getAttribute()`

   Lee el valor de un atributo que tiene un elemento cuando indicamos su propiedad en paréntesis

   ```javascript
   // Sintaxis:
   elemento.getAttribute('class');
   ```

4. `setAttribute()`

   Cambia el valor de un atributo que tiene un elemento cuando le indicamos su nuevo valor en paréntesis

   ```javascript
   // Sintaxis:
   elemento.setAttribute('class', 'nuevo-valor');
   ```

5. `classList.add()`

   Para agregar un valor a una clase existente en un elemento

   ```javascript
   // Sintaxis:
   elemento.classList.add('nuevo-valor1');
   ```

6. `classList.remove()`

   Para eliminar el valor descrito en paréntesis de la clase de un elemento

   ```javascript
   // Sintaxis:
   elemento.classList.remove('nuevo-valor1');
   ```

7. `classList.toggle('titulo')`

   Si tiene un valor descrito entre paréntesis se lo quita, o si no lo tiene se lo coloca:

   ```javascript
   // Sintaxis:
   elemento.classList.toggle('valor');
   ```

8. `classList.contains('titulo')`

   Devuelve true o false si una propiedad tiene un valor descrito entre paréntesis

   ```javascript
   // Sintaxis:
   elemento.classList.contains('valor');
   ```

9. `.value = 'valor'`

   Colocarle un valor a un elemento, usualmente colocado en inputs

   ```javascript
   // Sintaxis:
   elemento.value = '12345';
   ```

10. `.createElement()`

    Crea un elemento HTML (`<img>`, `<section>`, `<header>`, `<div>`, etc)

    ```javascript
    // Sintaxis:
    document.createElement('img');
    ```

11. `.append()`

    Puede agregar al documento uno o varios elementos creados previamente al agregarlos entre paréntesis

    ```javascript
    // Sintaxis:
    elemento.append(img, img2);
    ```

12. `.appendChild()`

    Puede agregar al documento solo un elemento creado previamente al agregarlo entre paréntesis

    ```javascript
    // Sintaxis:
    elemento.appendChild(img);
    ```
	
	## Scope
	
	![fa0270986691f14e541b274c2a8be001.png](/post/fa0270986691f14e541b274c2a8be001.png)
	
	## POO
	
	🎯 JavaScript: orientado a objetos, basado en prototipos
Apuntes
- JavaScript tiene características que lo hacen parecer roto, pero tienen un motivo
- Entender JS no le quita lo extraño, pero si lo haces te quitara mucha confusión
- Objetos vs. objetos vs. objetos
- En JS casi todo es un objeto
- Para crear algoritmos, funcionalidades debemos crear objetos
- Podemos crear objetos de diferentes formas:
1. - Abriendo llaves {}
2. - Object.create
3. - Podemos crear objetos a través de funciones
4. - Podemos utilizar o no la palabra new
- Al utilizar la palabra new ya no estaríamos creando objetos literales sino instancias de prototipos
- Para crear prototipos podemos implementar tanto la sintaxis de prototipos como la sintaxis de clases
- Normalmente, los lenguajes de programación son orientados a objetos y basados en clases
- JS es orientado a objetos y basado en prototipos

### Objeto literal
Los objetos literales se distinguen de los objetos de la POO porque no son instancias de un prototipo creado por el desarrollador.
. Sin embargo los objetos literales son instancias del prototipo Object creado por defecto en JavaScript. .

```
const Natalia = {
	'Name' : 'Natalia',
	'Age' : 20,
	'Rank': 2000, 
};
```
### Prototipo
Un prototipo es una estructura de código a partir de la cual se crean objetos, ya que guarda los atributos y métodos que luego podrán ser heredados por sus instancias. . Podemos pensarlo como un "molde" de objetos. .


```
function Student() {
	this.name = 'Nombre';
	this.age = '18';
	this.points = '750';
}
```

const Juanita = new Student();
### Objeto
Los objetos son estructuras de datos formadas por métodos y atributos, los cuales hereda de su prototipo padre. . De modo que los objetos son son instancias de ese prototipo, particularmente cuando dicho prototipo fue creado por el desarrollador (en caso contrario se llaman objetos literales). .

### Atributos
Dentro de los objetos se pueden guardar atributos para guardar en ellos la información la información que se les asocia. Así, toda la información del objeto se guarda en sí mismo. .

### Métodos
Dentro de los objetos también pueden guardarse métodos, los cuales son funciones que, entre otras cosas, permiten actualizar la información guardada en los atributos de forma segura. .

Atributo __proto__
Es el nombre que se le da al atributo donde se guardan los métodos que las estructuras de datos tienen por defecto en JavaScript. . El atributo __proto__ se hereda a partir de los prototipo por defecto de JavaScript para cada estructura de datos en particular, por ejemplo de los prototipos Object y Array. . El atributo __proto__ también se hereda a los objetos, ya que éstos son a la vez instancias de algún prototipo creado por el desarrollador y del prototipo Object.

![82b2cab75b294abf7185e3a2f827136e.png](/post/82b2cab75b294abf7185e3a2f827136e.png)

## API REST

API REST 🌐
API: Application Program Interface -> Interfaz Una interfaz es el medio por el cual la computadora se conecta con los humanos. Es lo visible para el usuario que interactúe con una app, por ejemplo.

API REST Es el medio por el cual se comunican computadoras con otras computadoras. O también podemos pensarlo como robots con robots 🤖🔁🤖. Puede ser backend con frontend, backend con backend, etc.

REST: Representational State Transfer

A diferencia de una página web, que se muestra con imágenes, textos formateados, etc.; la llamada de una API REST se devuelve en un archivo JSON.

Aunque pocas, algunas aplicaciones todavía usan el método SOAP para mandar información entre computadoras. Sin embargo, actualmente REST está dominando su aplicación.

![ec1cb65e55a7b975b5c7a99febab6153.png](/post/ec1cb65e55a7b975b5c7a99febab6153.png)

## FETCH

El método `fetch` en JavaScript es una API moderna para realizar solicitudes de red y recuperar recursos de servidores web. Es más versátil y poderoso que las técnicas anteriores, como `XMLHttpRequest`, y se basa en promesas, lo que hace que el manejo de solicitudes asincrónicas sea más limpio y legible. Aquí tienes información y ejemplos del método `fetch`:

### Sintaxis básica:

```javascript
fetch(url [, opciones]).then(response => {
  // Manejo de la respuesta
}).catch(error => {
  // Manejo de errores
});
```

- `url`: La URL del recurso que deseas recuperar.
- `opciones` (opcional): Un objeto con opciones adicionales para configurar la solicitud, como el método HTTP, encabezados, cuerpo, etc.

### Ejemplo de solicitud GET con `fetch`:

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json()) // Parsea la respuesta como JSON
  .then(data => {
    console.log(data); // Imprime los datos en la consola
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

En este ejemplo, realizamos una solicitud GET a una API y, una vez que se resuelve la promesa, convertimos la respuesta en un objeto JSON para su posterior procesamiento.

### Enviando datos con `fetch` (POST):

```javascript
const usuario = {
  nombre: 'Ejemplo',
  correo: 'ejemplo@email.com'
};

fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(usuario)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

En este caso, estamos enviando datos al servidor utilizando una solicitud POST. Definimos el método HTTP, los encabezados y convertimos el objeto `usuario` en formato JSON antes de enviarlo.

### Opciones adicionales:

El objeto de opciones puede incluir otras configuraciones, como encabezados personalizados, autenticación y más. Por ejemplo, puedes usar `headers` para agregar encabezados personalizados a la solicitud.

```javascript
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Custom-Header': 'Valor personalizado'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

El método `fetch` es altamente personalizable y versátil para realizar solicitudes y manejar respuestas en aplicaciones web. Es ampliamente utilizado en la programación web moderna para interactuar con APIs y recuperar datos de servidores.