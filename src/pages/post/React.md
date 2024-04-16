---
layout: ../../layouts/Postlayout.astro
pubDate: 2024-22-03
title: 'REACT: Apuntes de Estudio'
description: 'Estos son mis apuntes de estudio sobre el marco REACT conceptos básicos'
author: 'Ivan D Duque'
image:
    url: '/post/React.svg'
    alt: 'Foto SCRUM'
tags: ["Anotaciones", "Desarrollo Web", "JavaScript", "React", "Front"]
---

## 1. ¿Qué es React.js y cómo crear un proyecto?

React.js es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas. Puedes crear un proyecto de React utilizando herramientas como Create React App para establecer la estructura básica de un proyecto.Ejemplo:

`npx create-react-app mi-aplicacion`
`cd mi-aplicacion`
`npm start`

## 2. ¿Qué es un componente en React?

En React, un componente es una unidad independiente y reutilizable que puede representar una parte específica de la interfaz de usuario. Los componentes pueden ser de dos tipos: funcionales y de clase.Ejemplo de un componente funcional:

```js
import React from 'react';

function MiComponente() {
  return (
    <div>
      <h1>Soy un componente de React</h1>
      <p>Puedo representar contenido en la interfaz de usuario.</p>
    </div>
  );
}

export default MiComponente;
```

Este componente simple muestra un encabezado y un párrafo.

## 3. ¿Qué son los props y cómo se utilizan en React?

En React, **props** (abreviatura de "propiedades") son un mecanismo para pasar datos de un componente a otro. Los props son objetos que contienen valores que un componente hijo recibe de su componente padre. Esto permite la reutilización de componentes al personalizar su contenido y comportamiento. Aquí tienes un ejemplo:

```jsx
// Componente padre
function App() {
  return (
    <div>
      <Saludo nombre="Juan" />
      <Saludo nombre="María" />
    </div>
  );
}

// Componente hijo que recibe props
function Saludo(props) {
  return <p>Hola, {props.nombre}</p>;
}
```

En este ejemplo, el componente `Saludo` recibe el prop `nombre` del componente padre `App` y lo muestra en el mensaje de saludo.

## 4. Breve resumen de los estados en React:

En React, **estados** son datos que un componente puede mantener y cambiar durante su ciclo de vida. Los estados se utilizan para gestionar información que puede cambiar con el tiempo y que debe reflejarse en la interfaz de usuario. Puedes definir y modificar estados en componentes de clase con `this.state` y en componentes funcionales utilizando el hook `useState`. Aquí hay un ejemplo con el hook `useState`:

```jsx
import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(contador + 1);
  };

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}
```

En este ejemplo, el estado `contador` se inicia en 0 y se actualiza cuando se hace clic en el botón "Incrementar".