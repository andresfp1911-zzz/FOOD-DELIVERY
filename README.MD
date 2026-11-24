# FOOD DELIVERY

## Proposito

Crear una pagina web responsiva para un restaurante ficticio que permita explorar el menu, elegir productos, revisar un pedido, seleccionar un metodo de pago e ingresar la direccion de entrega.

Este proyecto sera de inspiracion visual en la comida rapida moderna, sin copiar marcas, logotipos ni elementos protegidos de McDonald's. La identidad visual sera original.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Google Fonts

## Funciones principales

1. Mostrar categorias y productos con fotografia, descripcion y precio.
2. Permitir agregar, quitar y modificar cantidades de productos.
3. Calcular automaticamente subtotal, costo de envio y total.
4. Mostrar metodos de pago disponibles.
5. Solicitar nombre, telefono, direccion y observaciones de entrega.
6. Generar un resumen del pedido y confirmar la compra.
7. Adaptar la interfaz a computadoras, tablets y celulares.

## Diseno visual

La interfaz tendra una estetica divertida, rapida y familiar, basada en:

- Titulos grandes y compactos.
- Bordes redondeados.
- Botones altos y faciles de pulsar.
- Tarjetas con sombra suave.
- Ilustraciones o fotografias de comida abundante.
- Iconos simples y etiquetas de categoria.
- Animaciones breves al agregar productos o cambiar de seccion.

### Tipografia

- Titulo: **Fredoka** o **Luckiest Guy**
- Texto y botones: **Nunito Sans** o **Poppins**
- Pesos principales: 700 para titulos, 600 para botones y 400 para contenido

### Combinaciones de colores

#### Opcion 1: Azul y negro

- Azul principal: `#0057D9`
- Azul claro: `#3B82F6`
- Negro: `#111827`
- Blanco: `#FFFFFF`

Esta opcion ofrece un aspecto moderno, fuerte y tecnologico. El negro puede utilizarse en fondos, encabezados y textos, mientras que el azul destaca botones, enlaces y promociones.

#### Opcion 2: Blanco y azul

- Blanco: `#FFFFFF`
- Azul principal: `#1261A0`
- Azul claro: `#DCEEFF`
- Texto oscuro: `#1F2937`

Esta opcion transmite limpieza, confianza y frescura. El fondo blanco mantiene una apariencia amplia y ordenada, y el azul se utiliza en botones, encabezados y estados activos.

#### Opcion 3: Coral y turquesa

- Coral: `#FF6B4A`
- Turquesa: `#1FA7A0`
- Arena: `#FFF1DF`
- Texto oscuro: `#28312E`

Esta opcion resulta juvenil, fresca y diferente.

#### Opcion 4: Morado y naranja

- Morado: `#5B2C83`
- Naranja: `#FF9F1C`
- Lavanda clara: `#F4EAF7`
- Texto oscuro: `#2B1E32`

Esta opcion combina energia, originalidad y una apariencia moderna. El morado puede utilizarse en encabezados y botones principales, mientras que el naranja destaca promociones y precios.

#### Opcion recomendada

La opcion 1, azul y negro, se recomienda como version principal por su fuerte contraste y personalidad moderna. La opcion 2, blanco y azul, sera la alternativa principal por ser mas clara y fresca. Todas las combinaciones deben mantener al menos un contraste de 4.5:1 para textos normales.

## Estructura de la pagina

### 1. Encabezado

- Logo personalizado.
- Navegacion: Menu, Promociones, Nosotros y Contacto.
- Boton visible para abrir el carrito.
- Indicador con la cantidad de productos seleccionados.

### 2. Inicio

- Banner principal con oferta destacada.
- Boton para ir al menu.
- Productos populares en tarjetas.
- Beneficios: entrega rapida, variedad y pago seguro.

### 3. Menu

- Filtros: Todos, Hamburguesas, Pollo, Papas, Bebidas y Postres.
- Tarjeta de producto con imagen, nombre, descripcion y precio.
- Boton Agregar.
- Busqueda opcional por nombre.

### 4. Carrito

- Lista de productos elegidos.
- Controles `-`, cantidad y `+`.
- Subtotal, envio y total.
- Boton para continuar al pago.

### 5. Pago y entrega

- Formulario de direccion y datos de contacto.
- Metodos: efectivo, tarjeta o pago digital.
- Resumen final del pedido.
- Mensaje de pedido confirmado.

## Diseno adaptable

### Escritorio

- Menu horizontal.
- Cuatro productos por fila.
- Carrito lateral o pagina separada.
- Banner amplio con texto e imagen.

### Tablet

- Menu horizontal compacto.
- Dos o tres productos por fila.
- Carrito debajo del resumen.

### Movil

- Menu de navegacion hamburguesa.
- Una o dos tarjetas por fila.
- Botones grandes y faciles de tocar.
- Carrito fijo en la parte inferior.
- Campos de formulario en una sola columna.

## Interacciones previstas

- Filtrar productos al elegir una categoria.
- Buscar productos por texto.
- Mostrar notificacion breve al agregar un producto.
- Actualizar cantidades y totales inmediatamente.
- Validar los campos obligatorios antes de confirmar.
- Guardar temporalmente el carrito con `localStorage`.
- Mostrar una animacion de carga o confirmacion del pedido.

## Datos iniciales

Ejemplo de datos que puede contener el arreglo de productos en JavaScript:

```js
{
  id: 1,
  nombre: "Burger Doble",
  categoria: "Hamburguesas",
  descripcion: "Pan suave, carne, queso y salsa especial.",
  precio: 8.50,
  imagen: "imagenes/burger-doble.jpg"
}
```

## Archivos sugeridos

```text
M9L2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── imagenes/
└── README.MD
```

## Plan de desarrollo

### Fase 1: estructura

- Crear HTML semantico.
- Definir encabezado, inicio, menu, carrito y pago.
- Organizar la informacion visual.

### Fase 2: estilos

- Implementar variables de color y tipografia.
- Crear tarjetas, botones y formularios.
- Agregar estilos responsive con media queries.

### Fase 3: funcionalidad

- Crear el arreglo de productos.
- Programar filtros y busqueda.
- Implementar el carrito y el calculo del total.
- Validar el formulario de entrega.

### Fase 4: pruebas

- Comprobar funcionamiento en escritorio y movil.
- Revisar botones, cantidades y mensajes de error.
- Comprobar contraste y navegacion por teclado.
- Verificar que no existan desbordamientos horizontales.
