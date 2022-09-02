# Canvas

## La propiedad [textAling](https://www.w3schools.com/tags/canvas_textalign.asp)

![](https://static.platzi.com/media/user_upload/text-788330e4-177b-444f-9911-661f51758139.jpg)

## Font

Si ponemos px y no tipo de fuente no funciona. [Aquí](https://www.w3schools.com/tags/canvas_font.asp) otros valores que le podemos dar.

```
game.font = '2.5rem Verdana';
game.fillStyle = 'red';
game.textAlign = 'start start';
game.fillText('Hola', 25, 25 );

```

## Cuadrado responsive

En HTML le podemos dar width y height, pero no sería responsive. 

Las medidas deben ser dinámicas.

Propiedades de win [innerHeight](https://developer.mozilla.org/es/docs/Web/API/Window/innerHeight) and [innerWidht](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth)


## **¿Qué es un array bidimensional?**

Arreglos dentro de arreglos

Usamos templete literal para tener saltos de línea 

I jugador

O posición inicial

-Espacio en blanco

x Obstáculos

```
`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`
```

Cada mapa arreglo de filas, y cada fila arreglo de columnas

```
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            game.fillText(m.emojis['X'], elementsSize * i, elementsSize * j - 9);  
        }
    }
```

## Array

Otra forma de mostrar cantidad de vidas

```
function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]
  // console.log(heartsArray);
  
  spanLives.innerHTML = "";
  heartsArray.forEach(heart => spanLives.append(heart));
}
```
## Tiempo de juego

setTimeout se ejecuta una sola vez

setInterval se ejecuta siempre. Hasta que ejecutemos clearInterval