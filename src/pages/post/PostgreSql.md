---
layout: ../../layouts/Postlayout.astro
pubDate: 2024-22-03
title: 'PosgreSQL: Aplicado a la Ciencia de datos'
description: 'Estos son mis apuntes de estudio sobre JavaScript conceptos básicos'
author: 'Ivan D Duque'
image:
    url: '/post/postgresql.jpg'
    alt: 'Apuntes JS'
tags: ["Desarrollo", "Bases de datos", "Apuntes"]
---

## Aplicación de la ciencia de datos

- **Data Driven.** Consiste en tomar decisiones basadas en los datos. Es labor del DS brindar estos datos y sus representaciones.
- **Información significativa.** Entender de que manera podemos aprovechar los datos para decir que cosa y cómo la vamos a presentar
- **Representación de los datos.** Es importante presentar de forma visual los datos dependiendo del problema y el publico al que va dirigida esta presentación.
- **Neutralidad de datos.** Hay ocasiones en la que los datos escogidos generan situaciones fuertes de discriminación a la hora de usarlos en modelos de AI, esto es conocido como Machine Bias.
- **Storytelling con datos.** Es importante ser capaz de comunicar resultados para poder generar un impacto dentro de la organización.

## Equipos orientado a datos 
### Perfiles 

- **DBA (Dabta Base Administrator)** Mantener y administrar el motor de base de datos
- **Data Warehouse (Almacén de datos)**. Guardar datos pensando a futuro para poder trabajarse
- **ETL/ Data Pipelines** Llevar datos de un lado a otro
- **BI (Business Intelligence)** Precursores del DataScience, empezar a extraer datos y entender los datos y sus repercusiones, encontrar patrones
- **Data Science** Entender a la organización e impactarla de forma positiva
- **ML (Machine Learning)** Técnica para clasificar información o realizar predicciones con datos historicos

![a9dfccf15d501b64f5a80d7ed9857e6a.png](/post/a9dfccf15d501b64f5a80d7ed9857e6a.png)

## Data science vs. Machine Learning

- **Machine Learning** - Es un conjunto de ciencias, estrategias, disciplinas y algoritmo que nos permite tomar la capacidad de computo de una computadora para resolver diversos problemas con algoritmos. Los mayores rubros de aplicación del ML son:
- - ++Clasificación++ - Se encarga de encontrar diferentes segmentos dentro de los datos. Suele estar asociado a técnicas de aprendizaje no supervisado. Un ejemplo útil sería clasificar a los clientes de un banco.
- - ++Predicción++ - Toma datos históricos para poder generar tendencias de algún tipo y así comprender comportamientos futuros.
- **Data Science** - Se enfoca principalmente en conocer a una organización o una empresa con alto nivel de detalle, de tal forma que tomar acciones basándose en las necesidades de estas. un DS posee muchas herramientas tales como la estadística, matemáticas, programación y también un conocimiento básico de Machine Learning para poder resolver los diferentes problemas que se presenten. Es importante que también posea un conocimiento profundo del negocio.

++ML Es una herramienta más que complementa al Data Science y a la organización++

## Diferencias entre otros manejadores y PostgreSQL

- Código libre y orientado a la comunidad
- Base de datos adaptada y madura, soporta JSON y funciones estadísticas
- PL/pgSQL (Procedural Language/PostgreSQL)
- Manejo de objetos
- Particiones en las tablas mediante estrategias
- Common table expressions tratamiento de tablas virtuales, más eficiente en tiempo de ejecusión
- Window functions trata de encontrar relaciones entre un registro y el resto de registros

## PLPGSQL: Stored procedures

- **Funciones** → Son más avanzadas. Regresan tipos de datos. Tienen más flexibilidad. No son estándar de SQL, se tiene que usar el lenguaje PLPGSQL.

```
--- Crear una función que suma dos números y devuelve el resultado
CREATE OR REPLACE FUNCTION sumar_numeros(a INT, b INT)
RETURNS INT AS $$
BEGIN
  RETURN a + b;
END;
$$ LANGUAGE plpgsql;

-- Llamar a la función
SELECT sumar_numeros(5, 3); -- Esto devolverá 8

```

- **Procedures** → Integran lógica a la sentencias SQL. Se han ido incluyendo en el estándar SQL. No regresan ningún valor.

```
-- Crear un procedimiento que inserta un nuevo registro en una tabla
CREATE OR REPLACE PROCEDURE insertar_registro(nombre TEXT, edad INT)
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO personas(nombre, edad) VALUES(nombre, edad);
END;
$$;

-- Llamar al procedimiento
CALL insertar_registro('Juan', 30);

```

### Diferencia entre SELECT Y CALL

Sí, hay una diferencia fundamental entre usar `SELECT` y `CALL` para llamar a un procedimiento en PostgreSQL. La elección de cómo llamar a un procedimiento depende de si deseas o no recibir un valor de retorno o resultado del procedimiento.

1. **SELECT**:
   - Utilizar `SELECT` para llamar a un procedimiento implica que el procedimiento debe tener un valor de retorno, es decir, una sentencia `RETURN` dentro del procedimiento que devuelve un valor.
   - Puedes utilizar `SELECT` para llamar a un procedimiento y recoger el valor de retorno en una variable o mostrarlo en la salida.
   - Esto es útil cuando el procedimiento debe realizar cálculos y devolver un resultado específico.

Ejemplo usando `SELECT` con un procedimiento que devuelve un valor:

```sql
-- Crear un procedimiento con un valor de retorno
CREATE OR REPLACE PROCEDURE obtener_promedio(edades INT[])
LANGUAGE plpgsql AS $$
BEGIN
  RETURN (SELECT AVG(unnest(edades)));
END;
$$;

-- Llamar al procedimiento utilizando SELECT
SELECT obtener_promedio(ARRAY[25, 30, 35, 40]); -- Esto devolverá el promedio de las edades
```

2. **CALL**:
   - Usar `CALL` para llamar a un procedimiento significa que el procedimiento no tiene un valor de retorno. En otras palabras, no está diseñado para devolver un resultado, sino para realizar una acción o una serie de acciones en la base de datos.
   - Puedes utilizar `CALL` para ejecutar un procedimiento que realiza cambios en la base de datos, como inserciones, actualizaciones o eliminaciones.

Ejemplo usando `CALL` con un procedimiento que no tiene un valor de retorno:

```sql
-- Crear un procedimiento que inserta un registro en una tabla
CREATE OR REPLACE PROCEDURE insertar_persona(nombre TEXT, edad INT)
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO personas(nombre, edad) VALUES(nombre, edad);
END;
$$;

-- Llamar al procedimiento utilizando CALL
CALL insertar_persona('Ana', 28); -- Esto insertará un nuevo registro en la tabla personas
```

En resumen, la elección entre `SELECT` y `CALL` depende de si el procedimiento tiene un valor de retorno. Si el procedimiento devuelve un valor, utiliza `SELECT` para recoger ese valor. Si el procedimiento no tiene un valor de retorno y se utiliza para realizar acciones en la base de datos, utiliza `CALL`.

## PLPGSQL: conteo, registro y triggers

Un trigger es un tipo de objeto en una base de datos que se ejecuta automáticamente en respuesta a ciertos eventos, como inserciones, actualizaciones o eliminaciones en una tabla. Puedes asociar una función a un trigger para que se ejecute cuando ocurra el evento desencadenante. Aquí tienes un ejemplo de cómo crear un trigger que utiliza una función en PostgreSQL:

Supongamos que tienes una tabla llamada `ventas` y deseas mantener un registro de las ventas totales en otra tabla llamada `resumen_ventas`. Para hacerlo, puedes crear una función y un trigger que actualice automáticamente el resumen de ventas cuando se realice una venta. Aquí está el ejemplo:

1. Primero, crea una función en la base de datos que actualice el resumen de ventas:

```sql
-- Crear una función que actualiza el resumen de ventas
CREATE OR REPLACE FUNCTION actualizar_resumen_ventas() RETURNS TRIGGER AS $$
BEGIN
  UPDATE resumen_ventas
  SET total_ventas = total_ventas + NEW.monto
  WHERE fecha = current_date;
  IF NOT FOUND THEN
    INSERT INTO resumen_ventas(fecha, total_ventas)
    VALUES (current_date, NEW.monto);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

En esta función, se toma el monto de la nueva venta (`NEW.monto`) y se actualiza el total de ventas en la tabla `resumen_ventas`. Si no existe una fila para la fecha actual, se inserta una nueva fila.

2. Luego, crea un trigger que se active después de una inserción en la tabla `ventas` y que llame a la función que hemos creado:

```sql
-- Crear un trigger que se activa después de una inserción en la tabla ventas
CREATE TRIGGER trigger_actualizar_resumen
AFTER INSERT ON ventas
FOR EACH ROW
EXECUTE FUNCTION actualizar_resumen_ventas();
```

Ahora, cada vez que se realice una inserción en la tabla `ventas`, el trigger `trigger_actualizar_resumen` llamará a la función `actualizar_resumen_ventas`, que actualizará o insertará registros en la tabla `resumen_ventas` según corresponda.

Este es un ejemplo de cómo usar una función en conjunto con un trigger para mantener registros actualizados en una base de datos en respuesta a eventos específicos.

## PLPGSQL: Aplicado a data science

```sql
CREATE OR REPLACE FUNCTION movies_stats()
RETURNS void 
LANGUAGE plpgsql
AS $$
	DECLARE 
		total_retake_r REAL := 0.0;
		total_larger_than_100 REAL := 0.0;
		total_published_2006 REAL := 0.0;
		average_duracion REAL:= 0.0;
		average_rental_price REAL := 0.0;
	BEGIN
		total_retake_r := COUNT(*) FROM peliculas WHERE clasificacion = 'R';
		total_larger_than_100 := COUNT(*) FROM peliculas WHERE duracion > 100;
		total_published_2006 := COUNT(*) FROM peliculas WHERE anio_publicacion = 2006;
		average_duracion := AVG(duracion) FROM peliculas;
		average_rental_price := AVG(precio_renta) FROM peliculas;
		
		TRUNCATE TABLE peliculas_estadisticas;
		
		INSERT INTO peliculas_estadisticas(tipo_estadistica, total) 
		VALUES 
			('Peliculas con clasificación R', total_retake_r),
			('Peliculas de más de 100 min', total_larger_than_100),
			('Peliculas publicadas en el 2006', total_published_2006),
			('Promedio de duración', average_duracion),
			('Promedio de precio de renta', average_rental_price);
END
$$
```

## Tipos de Datos Personalizados

postgreSQL cuenta con una funcionalidad muy poderosa, la cual es dejar que el usuario cree sus propios datos personalizados.

```
CREATE TYPE humor AS ENUM ('triste', 'normal', 'feliz');

CREATE TABLE persona_prueba(
	nombre text,
	humor_actual humor
);

#al tratar de incertar el tipo de dato molesto daria un error en el Query 
#esto devido a que ese valor no esta predefinido en nuestra creacion de datos
INSERT INTO persona_prueba VALUES ('Pablo', 'molesto');

INSERT INTO persona_prueba VALUES ('Pablo', 'feliz');

SELECT * FROM persona_prueba;
```


### JSON en PostgreSQL

Una caracteristica muy importante de PostgreSQL es su capacidad de trabajar con estructuras JSON.

JSON Texto plano - Es unicamente un string de texto.
JSON Binary - Es más rápido de procesar ya que se guarda como un archivo binario.
El uso de objetos nos dará más flexibilidad en el trabajo.


```
-- Inserción de datos
INSERT INTO  ordenes(info)
VALUES
('{"cliente":"Edna Moda", "items":{"producto":"Biberon", "cantidad":3}}'),
('{"cliente":"Juan Moda", "items":{"producto":"Carro", "cantidad":3}}');

-- Extrae los datos con formato JSON
SELECT info->'cliente' AS cliente FROM ordenes;

-- Extrae los datos con el tipo de dato asignado por Postgres
SELECT info->>'cliente' AS cliente FROM ordenes;
```

Es importante recalcar que a pesar de que Postgres nos permite realizar operaciones sobre los datos de cadenas JSON este proceso resulta costoso, y es recomendable trabajar con tipos de datos básicos siempre que sea posible.


```
SELECT 
	SUM(
		-- Cambiando a tipo de dato entero
		CAST( info -> 'items' ->> 'cantidad' AS INTEGER)
	),
	MAX(
		CAST( info -> 'items' ->> 'cantidad' AS INTEGER)
	),
	AVG(
		CAST( info -> 'items' ->> 'cantidad' AS INTEGER)
	)
FROM ordenes;
```

### COMMON TABLE EXPRESSION CTE

Lo que hace las CTE es crear tablas de consulta virtuales/temporales (sin output de datos) equivalentes a los campos que solicita el Query principal.

Luego, con un SELECT externo al WITH, se hace el llamado para unir los SELECT dentro del WITH y así visualizar la consulta solicitada principalmente. Para el ejemplo, era la solicitud “las películas de genero Horror mas rentadas con un precio de renta mayor a $1 y con mas de 100 minutos de duración”

Donde podemos resumir que se requieren los siguientes datos:

- Conteo de rentas total (rentas_acumuladas)
- Agrupación por película
- Filtro 1 por categoría “Horror” (genero)
- Filtro 2 duración mayor a 100 minutos
- Filtro 3 precio de renta mayor a $1
- Entonces, al iniciar con la sentencia WITH se da creación a las tablas temporales; tantas como campos solicite el Query principal y que se puedan consolidar en una consulta con JOIN simples.


**--DECLARACIÓN DE LA CTE CON *WITH*--**
`WITH` 
**--PRIMERA TABLA TEMPORAL--**
```
peliculas_rentadas AS (
	SELECT pelicula_id, COUNT(fecha_renta) AS rentas_acumuladas
	FROM inventarios
	JOIN  rentas
		ON inventarios.inventario_id = rentas.inventario_id
	GROUP BY inventarios.pelicula_id
	ORDER BY rentas_acumuladas DESC
),
```
Esta primera expresión, responde al apartado ‘conteo de rentas total’ o ‘rentas_acumuladas’ y por consiguiente a la respectiva ‘agrupación por película’. Luego continúa la segunda tabla temporal, igualmente dentro de la sentencia WITH.


**--SEGUNDA TABLA TEMPORAL--**
```
peliculas_categoria_horror AS (
	SELECT pelicula_id, nombre
	FROM peliculas_categorias
	JOIN categorias 
		ON peliculas_categorias.categoria_id = categorias.categoria_id
	WHERE 
		categorias.nombre = 'Horror'
)
```
La segunda expresión del WITH llamada ‘peliculas_categoria_horror’ responde al filtro 1, el cual solo desea ver las películas de la categoría/genero ‘Horror’. Seguido a esto se cierra la sentencia WITH para este CTE con paréntesis y se inicia la consulta externa.


**--CONSULTA EXTERNA PARA VISUALIZAR RESULTADOS--**
```
SELECT 
	peliculas.titulo,
	peliculas_categoria_horror.nombre AS genero,
	peliculas_rentadas.rentas_acumuladas AS rentas_acumuladas,
	precio_renta * (peliculas_rentadas.rentas_acumuladas) AS monto_rentas_acumulado
``` 
	
```
FROM peliculas
	JOIN peliculas_categoria_horror
		ON peliculas.pelicula_id = peliculas_categoria_horror.pelicula_id
	JOIN peliculas_rentadas
		ON peliculas.pelicula_id = peliculas_rentadas.pelicula_id
```
En esta parte del Query, simplemente se hace un SELECT que llama los campos generados en las tablas temporales. Además, se hacen JOIN para relacionarlos y traer también los nombres de las películas en vez de solamente el ID de cada una de ellas.


**--FILTROS 2 Y 3 DE LA CONSULTA EXTERNA--**
```
WHERE 
	peliculas.duracion > 100 and peliculas.precio_renta < 1;
Finalmente se aplican los filtros 2 y 3 que al ser dependientes de la tabla ‘películas’, la cual se relacionó en la consulta externa anterior, se escriben solamente al final de esta.
```

## WINDOWS 

![ca3345565d1b3bff6e482bb2407dcc8c.png](/post/ca3345565d1b3bff6e482bb2407dcc8c.png)

## PARTICIONES

Particionado - Dividir una tabla en segmentos lógicos. Es una practica común de los manejadores, pero no todos ofrecen la opción para los usuarios de administrar estas particiones. Resulta útil para optimizar las consultas de datos. 

Observaciones:

- No todas las tablas deben de ser particionadas, vale la pena hacerlo unicamente cuando hay muchos registros.
- Permite optimizar algunas consultas al no tener que buscar dentro de toda una tabla sino unicamente en un segmento especifico.
- El particionado altera la consistencia de la tablas
- No existen los indices (llaves primarias) en las particiones, o mejor dicho, estos indices cambian basándose en la partición. e.g Si particionas una tabla por fechas, al buscar un dato especifico el primer criterio de búsqueda será la fecha