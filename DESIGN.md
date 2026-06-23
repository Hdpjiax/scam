---
name: NŌMA Casa Viva
description: Lujo silencioso digital para una tienda de hogar y su operación comercial.
colors:
  nocturne-ink: "#1c1d19"
  mineral-black: "#282b25"
  gallery-paper: "#f4f1e9"
  quiet-surface: "#eae4d8"
  fired-clay: "#9d5037"
  structural-line: "#d5d0c5"
  soft-copy: "#5d5d56"
  pure-light: "#ffffff"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(3.25rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  subtle: "7px"
  control: "12px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "36px"
  xl: "64px"
  section: "clamp(80px, 10vw, 140px)"
components:
  button-primary:
    backgroundColor: "{colors.nocturne-ink}"
    textColor: "{colors.pure-light}"
    rounded: "{rounded.none}"
    padding: "16px 22px"
  button-secondary:
    backgroundColor: "{colors.gallery-paper}"
    textColor: "{colors.nocturne-ink}"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  chip-filter:
    backgroundColor: "{colors.gallery-paper}"
    textColor: "{colors.nocturne-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 17px"
  input-quiet:
    backgroundColor: "{colors.gallery-paper}"
    textColor: "{colors.nocturne-ink}"
    rounded: "{rounded.none}"
    padding: "13px 0"
---

# Design System: NŌMA Casa Viva

## 1. Overview

**Creative North Star: “Lujo Silencioso Digital”**

NŌMA se comporta como una galería doméstica al caer la noche: fondos minerales casi negros, imágenes iluminadas con precisión y producto suficiente para provocar deseo sin convertir la interfaz en un espectáculo ruidoso. La tienda admite momentos cinematográficos; el panel administrativo traduce la misma identidad a densidad, precisión y velocidad operativa.

El sistema es oscuro por convicción, no por moda. El papel cálido existente permanece como superficie secundaria para checkout, fichas extensas y momentos de descanso. Los controles son táctiles y contundentes: estados claros, áreas generosas y respuesta inmediata. Se rechazan las plantillas genéricas de Shopify, los dashboards SaaS intercambiables, el beige editorial dominante, el glassmorphism y las cuadrículas interminables de tarjetas idénticas.

**Key Characteristics:**

- Negro mineral dominante con arcilla usada como señal excepcional.
- Producto e imagen como fuentes principales de color.
- Tipografía de alto contraste, nunca por encima de 6rem.
- Profundidad híbrida: capas tonales permanentes y sombras solo cuando existe elevación real.
- Movimiento cinematográfico puntual, acompañado siempre por una alternativa reducida.
- Tienda expresiva y panel preciso dentro de una sola identidad.

## 2. Colors

La paleta parte de la oscuridad arquitectónica y reserva el papel cálido para superficies funcionales de lectura prolongada.

### Primary

- **Nocturne Ink** (`#1c1d19`): fondo de marca, controles primarios, navegación y superficies de máximo contraste.
- **Fired Clay** (`#9d5037`): señal comercial excepcional para carrito, estado activo, énfasis y confirmaciones; nunca relleno decorativo extendido.

### Secondary

- **Mineral Black** (`#282b25`): crea profundidad entre planos oscuros, manifiestos y paneles secundarios.
- **Gallery Paper** (`#f4f1e9`): superficie de lectura, formularios y descansos visuales, no color dominante de toda la experiencia.

### Neutral

- **Quiet Surface** (`#eae4d8`): resumen de pedidos y capas funcionales suaves.
- **Structural Line** (`#d5d0c5`): divisores y límites, siempre de un píxel.
- **Soft Copy** (`#5d5d56`): texto secundario únicamente sobre fondos claros donde cumple AAA; sobre negro se usa una variante clara del color del texto.
- **Pure Light** (`#ffffff`): texto e iconografía de contraste máximo.

### Named Rules

**The Fired-Clay Signal Rule.** La arcilla ocupa menos del 10% de una pantalla; su rareza comunica acción o estado.

**The Paper-Is-a-Room Rule.** Gallery Paper es una habitación funcional dentro del sistema oscuro, no el fondo automático del producto completo.

## 3. Typography

**Display Font:** Gloock (Georgia como respaldo)  
**Body Font:** DM Sans (Arial como respaldo)

**Character:** Gloock aporta tensión escultórica a titulares breves; DM Sans convierte precios, filtros, formularios y datos operativos en información silenciosa y directa. La pareja actual se conserva como identidad existente, aunque una futura sustitución debe evaluarse contra el principio de lujo oscuro, no contra tendencias editoriales.

### Hierarchy

- **Display** (400, `clamp(3.25rem, 7vw, 6rem)`, 0.95): una sola idea dominante por viewport; nunca excede 6rem ni baja de `-0.04em` de tracking.
- **Headline** (400, `clamp(2.5rem, 5vw, 5rem)`, 1): títulos de sección y producto.
- **Title** (400, `1.25rem–2rem`, 1.15): nombres de producto, módulos y encabezados administrativos.
- **Body** (400, `1rem`, 1.7): descripción y orientación; ancho máximo de 70 caracteres.
- **Label** (600, `0.6875rem`, `0.12em`): estados, categorías y metadatos breves. No se repite como ceja encima de cada sección.

### Named Rules

**The One Sculptural Voice Rule.** Una pantalla tiene un solo titular escultórico; el resto de la jerarquía habla en voz funcional.

## 4. Elevation

La profundidad mezcla capas tonales y elevación ambiental. Las superficies permanecen planas en reposo. Drawers, modales, menús flotantes y producto activo pueden elevarse mediante una sombra corta y oscura; los estados internos del panel se separan con tono y divisores, no con tarjetas flotantes repetidas.

### Shadow Vocabulary

- **Drawer Depth** (`0 12px 32px rgba(0,0,0,.24)`): drawers y modales sobre fondo atenuado.
- **Interactive Lift** (`0 4px 8px rgba(0,0,0,.16)`): producto o control que se eleva como respuesta de hover, nunca junto con un borde decorativo.

### Named Rules

**The Flat-at-Rest Rule.** Ninguna superficie recibe sombra solo para parecer premium; la sombra comunica una relación espacial o un cambio de estado.

## 5. Components

### Buttons

- **Shape:** rectangular y táctil; radio cero en acciones de marca y hasta 7px en el panel.
- **Primary:** Nocturne Ink sobre Gallery Paper o Pure Light sobre fondo oscuro, con `16px 22px` como mínimo.
- **Hover / Focus:** desplazamiento máximo de 2px y cambio tonal. Foco visible de dos píxeles con separación; jamás solo color.
- **Secondary / Ghost:** una línea estructural o subrayado direccional, sin sombras amplias.

### Chips

- **Style:** píldora solo para filtros y estados compactos; no convierte acciones normales en cápsulas.
- **State:** inactivo con línea estructural; activo con Nocturne Ink y texto claro.

### Cards / Containers

- **Corner Style:** esquinas rectas en producto e imagen; 7–12px únicamente en contenedores operativos.
- **Background:** capa tonal clara u oscura según el contexto.
- **Shadow Strategy:** planos en reposo, elevación breve en interacción.
- **Border:** un píxel cuando estructura información; nunca borde y sombra amplia simultáneamente.
- **Internal Padding:** 20px para módulos compactos, 36px para módulos editoriales.

### Inputs / Fields

- **Style:** línea inferior o superficie tonal, sin cápsulas ni glassmorphism.
- **Focus:** anillo visible AAA y contraste reforzado.
- **Error / Disabled:** icono, texto y color; nunca color como único indicador.

### Navigation

La tienda usa navegación delgada y silenciosa sobre el contenido. El panel mantiene un rail mineral con estado activo inequívoco. En móvil, la navegación se reduce sin ocultar cuenta, carrito o acciones críticas.

### Product Stage

La imagen ocupa la mayor área de la ficha. El bloque de compra permanece legible y estable mientras la galería puede incorporar movimientos de máscara, parallax moderado y transiciones de material. Precio, stock y acción de compra nunca se mueven ni desaparecen por una animación.

## 6. Do's and Don'ts

### Do:

- **Do** usar Nocturne Ink como superficie dominante y Gallery Paper como descanso funcional.
- **Do** mantener contraste WCAG 2.2 AAA y foco visible en todos los controles.
- **Do** limitar titulares a 6rem y `-0.04em` como tracking mínimo.
- **Do** diseñar tienda y administración como expresiones de la misma marca.
- **Do** ofrecer `prefers-reduced-motion` para cada efecto visual, conservando toda la información.
- **Do** usar fotografías y producto para introducir variedad cromática.

### Don't:

- **Don't** parecer una plantilla genérica de Shopify, un marketplace indiferenciado o un dashboard SaaS intercambiable.
- **Don't** volver al beige editorial como fondo automático de toda la experiencia.
- **Don't** usar glassmorphism decorativo, texto con degradado, rayas diagonales ni ilustraciones SVG improvisadas.
- **Don't** crear cuadrículas interminables de tarjetas idénticas o tarjetas anidadas.
- **Don't** repetir cejas en mayúsculas o marcadores `01 / 02 / 03` como gramática de cada sección.
- **Don't** combinar borde de un píxel con sombras de 16px o más de blur en el mismo componente.
- **Don't** almacenar datos bancarios ni disfrazar una simulación de pago como procesamiento real.
