---
target: tienda y panel
total_score: 19
p0_count: 0
p1_count: 4
timestamp: 2026-06-23T07-34-19Z
slug: src-app-tsx-src-components-admin-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|------:|-----------|
| 1 | Visibility of System Status | 2/4 | Favoritos, newsletter, guardado y cambios de estado carecen de feedback claro. |
| 2 | Match System / Real World | 3/4 | El lenguaje comercial es comprensible, aunque parte del copy poético oculta utilidad. |
| 3 | User Control and Freedom | 2/4 | No hay deshacer en estados de pedidos; el menú móvil no funciona. |
| 4 | Consistency and Standards | 2/4 | Tienda y panel parecen productos de marcas distintas. |
| 5 | Error Prevention | 2/4 | Mutaciones críticas sin validación suficiente, confirmación diseñada o recuperación. |
| 6 | Recognition Rather Than Recall | 3/4 | La información principal es visible; la navegación administrativa móvil queda reducida a iconos. |
| 7 | Flexibility and Efficiency | 1/4 | Sin acciones masivas, atajos, vistas guardadas, paginación ni flujos rápidos. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Buena jerarquía inicial, pero demasiados dispositivos promocionales familiares y una pared de productos. |
| 9 | Error Recovery | 1/4 | Casi no existen estados de error, reintento, undo o recuperación. |
| 10 | Help and Documentation | 1/4 | Enlaces de ayuda aparentes no navegan y el panel no ofrece soporte contextual. |
| **Total** | | **19/40** | **Deficiente: la base es prometedora, pero aún no está lista para mercado.** |

#### Anti-Patterns Verdict

**LLM assessment:** Sí, parcialmente parece generado por IA. La tienda mezcla beige editorial, serif de lujo, cejas pequeñas repetidas, marcadores `01/02/03`, marquee, orbes y una cuadrícula uniforme: una receta reconocible de e-commerce aspiracional. El panel cae en el cliché contrario, con tarjetas blancas y métricas genéricas de dashboard SaaS. La ruptura entre ambos contradice el principio de “una marca, dos expresiones”.

**Deterministic scan:** 33 hallazgos advisory: 32 colores literales fuera de `DESIGN.md` y un radio literal fuera del sistema. `src/expansion.css` concentra 21 hallazgos; `src/styles.css`, 12. Parte de los colores son scrims o estados funcionales razonables, pero siguen sin estar documentados. El radio `50px` es un falso positivo semántico parcial: representa una píldora válida, pero debería usar el token `pill`.

**Visual overlays:** No hay overlay visible confiable. El navegador disponible expone evaluación de solo lectura y rechazó la mutación de preflight; la evidencia se obtuvo mediante DOM, estructura accesible, logs y revisión del código.

#### Overall Impression

El hero y las escenas de categoría generan deseo genuino; el catálogo masivo lo convierte después en una tienda común. La mayor oportunidad es llevar “Lujo Silencioso Digital” de documento a sistema real: negro dominante, ritmo más selectivo, descubrimiento progresivo y un panel operativo que se sienta NŌMA sin sacrificar familiaridad.

#### What's Working

- La fotografía construye un mundo doméstico tangible y coherente.
- Precio, categoría, stock, estado y métricas críticas aparecen con buena visibilidad.
- La voz española, la serif escultórica y el acento arcilla ofrecen una base reconocible.

#### Priority Issues

1. **[P1] Navegación móvil incompleta**
   - **Why it matters:** Debajo de 900px desaparecen navegación, búsqueda y cuenta; el botón de menú no ejecuta ninguna acción.
   - **Fix:** Construir un menú móvil accesible con categorías, búsqueda, cuenta, foco atrapado y cierre por Escape; mantener carrito y búsqueda primaria en la zona del pulgar.
   - **Suggested command:** `$impeccable adapt tienda`

2. **[P1] Incumplimiento del objetivo WCAG 2.2 AAA**
   - **Why it matters:** Faltan estados `:focus-visible`, reducción de movimiento, nombres accesibles y objetivos táctiles de 44px; algunos inputs eliminan el outline.
   - **Fix:** Implementar tokens de foco, nombres accesibles, etiquetas para selects/newsletter, objetivos mínimos y alternativas `prefers-reduced-motion` para marquee, orbes, zoom, rise y bob.
   - **Suggested command:** `$impeccable audit tienda y panel`

3. **[P1] Ruptura de identidad entre tienda y administración**
   - **Why it matters:** La tienda es editorial cálida; el panel es un dashboard blanco genérico. Ninguno materializa completamente la dirección oscura acordada.
   - **Fix:** Aplicar Nocturne Ink como arquitectura común, conservar Gallery Paper como habitación funcional, unificar controles y usar el acento Fired Clay únicamente para estado y acción.
   - **Suggested command:** `$impeccable colorize tienda y panel`

4. **[P1] Mutaciones administrativas sin seguridad ni recuperación**
   - **Why it matters:** Cambiar un pago es tan fácil como elegir un filtro; eliminar usa `confirm()` nativo; no hay undo, success toast, validación de SKU o protección contra pérdida de cambios.
   - **Fix:** Añadir estados staged, confirmación contextual, undo, validación de negocio, dirty-state guard y feedback persistente.
   - **Suggested command:** `$impeccable harden panel`

5. **[P2] Andamiaje visual reconocible como IA y exceso de carga**
   - **Why it matters:** Nueve filtros, 20 productos simultáneos, cejas repetidas, numeración decorativa, beige dominante, marquee y orbes diluyen la singularidad.
   - **Fix:** Sustituir la pared de productos por descubrimiento progresivo, eliminar marcadores decorativos y limitar la teatralidad a dos o tres momentos orquestados.
   - **Suggested command:** `$impeccable distill tienda`

#### Persona Red Flags

**Casey — comprador móvil distraído:** El menú no funciona, los favoritos son pequeños, los filtros requieren scroll lateral y la cuadrícula de dos columnas comprime nombres y precios.

**Jordan — comprador por primera vez:** Favoritos y newsletter no confirman nada; varios elementos del footer parecen enlaces pero no lo son; el copy aspiracional no siempre explica la utilidad del producto.

**Alex — operador experto:** No existen acciones masivas, búsqueda avanzada, atajos, vistas guardadas, paginación ni actualización rápida de varios inventarios.

**Sam — usuario con necesidades de accesibilidad:** Inputs sin outline, botones sin nombre, selects sin etiqueta, animaciones sin reducción y acciones reveladas por hover bloquean o degradan el flujo.

**Riley — tester de estrés:** No hay manejo visible para archivos grandes, SKU duplicado, stock o precio negativos, fallos de persistencia y cambios accidentales de pago.

#### Minor Observations

- El hero alcanza 126px y rebasa el máximo de 6rem definido en `DESIGN.md`.
- Hay 9 opciones de categoría visibles, superando el umbral de cuatro decisiones simultáneas.
- Dos botones del header, el cierre del drawer, el ordenamiento y el estado de pedidos carecen de nombre accesible.
- Los anchors del footer sin `href` prometen navegación inexistente.
- El panel representa pedidos mediante `div` grid, no una tabla semántica.
- Todos los indicadores administrativos reutilizan el mismo icono de gráfica.
- Los colores de stock, error, overlays y neutros no forman todavía un vocabulario tokenizado.

#### Questions to Consider

- Si retiramos el logotipo, ¿qué hace inequívocamente NŌMA a esta experiencia?
- ¿La pared de veinte productos ayuda a descubrir o destruye el deseo que construyó el hero?
- ¿Un cambio de estado de pago debería sentirse tan reversible como un filtro?
- ¿Qué dos momentos merecen realmente el espectáculo visual y cuáles deben desaparecer dentro de la tarea?
