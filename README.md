# Gabriela Prado — Sitio personal

Sitio web estático de una sola página para Gabriela Prado, contadora enfocada en contabilidad, finanzas, análisis de datos y automatización de reportes en Costa Rica.

Está construido únicamente con HTML5, CSS3 y JavaScript vanilla. No utiliza frameworks, backend ni proceso de build.

## Estructura del proyecto

```text
gp-contabilidad/
|
|-- index.html
|-- README.md
|-- .gitignore
`-- assets/
    |-- css/styles.css
    |-- js/script.js
    `-- images/
        |-- ilustracion-contabilidad.svg
        `-- favicon.svg
```

La estructura de archivos se mantiene preparada para abrir `index.html` directamente o publicarlo en GitHub Pages.

## Cómo abrirlo localmente

La opción rápida es hacer doble clic en `index.html`.

Para usar un servidor local sin instalar dependencias, desde la carpeta del proyecto ejecuta:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Qué modificar y dónde

| Necesito cambiar... | Archivo | Ubicación |
|---|---|---|
| Nombre y SEO | `index.html` | `<title>`, descripción, Open Graph y JSON-LD |
| Texto del hero | `index.html` | Sección `hero` |
| Problemas | `index.html` | Sección `problemas` |
| Servicios | `index.html` | Sección `servicios` y bloque de conversión |
| Texto personal | `index.html` | Entre `INICIO TEXTO EDITABLE` y `FIN TEXTO EDITABLE` |
| Formación y herramientas | `index.html` | Bloque `VERIFICAR Y EDITAR` |
| Fotografía | `index.html` y `assets/images/` | Agrega `assets/images/gabriela.jpg` y reemplaza el marcador comentado |
| LinkedIn | `index.html` | Perfil en la sección personal, JSON-LD y footer |
| Preguntas frecuentes | `index.html` | Bloque `faq`; conserva los pares `aria-controls` e `id` |
| Contactos | `index.html` | WhatsApp `50689168077` y `contaprado26@gmail.com` aparecen en header, contacto y footer |
| Colores y tipografías | `assets/css/styles.css` | Bloque `:root` al inicio |
| Validación y formulario | `assets/js/script.js` | Reglas de validación y endpoint opcional |

Los datos de contacto actuales son los que ya estaban en el proyecto. Verifícalos antes de publicar.

## Fotografía

El hero conserva la ilustración SVG actual. La sección `Soy Gabriela` tiene un marcador de posición para una fotografía profesional. Para incorporarla:

1. Guarda la imagen como `assets/images/gabriela.jpg`.
2. Sustituye el marcador por un `<img>` con texto `alt` descriptivo.
3. También puedes activar el `<img>` alternativo comentado en el hero.

## Credenciales

El bloque de formación y herramientas está marcado con `VERIFICAR Y EDITAR`. Confirma cada elemento antes de publicar y elimina cualquier dato que no corresponda exactamente a la información profesional real.

## Casos y testimonios

Las secciones `Casos` y `Testimonios` están escritas dentro de un comentario HTML, por lo que no se muestran ni ocupan espacio en la página. Para activarlas, elimina los delimitadores de comentario que rodean cada sección y reemplaza los textos `[Completar]` con información verificada y autorizada.

## Formulario

Actualmente el formulario valida los datos y muestra un mensaje en pantalla, pero no envía información a ningún servidor.

Para conectarlo con Formspree u otro servicio, agrega la URL en `data-endpoint` del formulario. El JavaScript ya envía los campos `nombre`, `correo`, `telefono`, `servicio` y `mensaje` mediante `fetch`.

## Publicación

Para GitHub Pages:

1. Sube el contenido del repositorio a GitHub.
2. En `Settings` > `Pages`, elige `Deploy from a branch`.
3. Selecciona la rama `main` y la carpeta raíz `/ (root)`.

No hay comando de build. La carpeta raíz es directamente publicable.

## Accesibilidad y responsive

El sitio conserva el enlace de salto al contenido, foco visible, navegación móvil con `aria-expanded`, acordeones con regiones etiquetadas, labels del formulario y soporte para `prefers-reduced-motion`. El CSS usa un enfoque mobile-first y agrega distribuciones para tablet, laptop y monitores grandes.