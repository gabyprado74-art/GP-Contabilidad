/* ============================================================
  Gabriela Prado — script.js
   Sin librerías externas. JavaScript vanilla.

   Contenido:
   1. Menú móvil (hamburguesa)
   2. Acordeones de preguntas frecuentes
   3. Formulario de contacto (validación + envío preparado)
   4. Año dinámico en el pie de página
   ============================================================ */

(function () {
  "use strict";

  /* --------------------------------------------------------
     1. MENÚ MÓVIL
     -------------------------------------------------------- */
  var menuBoton = document.getElementById("menuBoton");
  var menu = document.getElementById("menuPrincipal");
  var fondoMenu = document.getElementById("fondoMenu");

  function abrirMenu() {
    menu.classList.add("esta-abierto");
    menuBoton.setAttribute("aria-expanded", "true");
    menuBoton.setAttribute("aria-label", "Cerrar menú de navegación");
    fondoMenu.hidden = false;
  }

  function cerrarMenu() {
    menu.classList.remove("esta-abierto");
    menuBoton.setAttribute("aria-expanded", "false");
    menuBoton.setAttribute("aria-label", "Abrir menú de navegación");
    fondoMenu.hidden = true;
  }

  if (menuBoton && menu && fondoMenu) {
    menuBoton.addEventListener("click", function () {
      var estaAbierto = menuBoton.getAttribute("aria-expanded") === "true";
      if (estaAbierto) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    // Al tocar un enlace del menú, se cierra
    menu.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) {
        cerrarMenu();
      }
    });

    // Al tocar fuera del menú, se cierra
    fondoMenu.addEventListener("click", cerrarMenu);

    // Tecla Escape: cierra y devuelve el foco al botón
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && menuBoton.getAttribute("aria-expanded") === "true") {
        cerrarMenu();
        menuBoton.focus();
      }
    });

    // Si la pantalla crece hasta el ancho de escritorio, se reinicia el estado
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) {
        cerrarMenu();
      }
    });
  }

  /* --------------------------------------------------------
     2. ACORDEONES DE PREGUNTAS FRECUENTES
     Cada botón controla el panel indicado en aria-controls.
     -------------------------------------------------------- */
  var preguntas = document.querySelectorAll(".faq__pregunta");

  preguntas.forEach(function (pregunta) {
    pregunta.addEventListener("click", function () {
      var panel = document.getElementById(pregunta.getAttribute("aria-controls"));
      if (!panel) return;

      var estaAbierta = pregunta.getAttribute("aria-expanded") === "true";

      // Cierra las demás para mantener una sola abierta a la vez.
      // Si prefieres que se puedan abrir varias, borra este bloque.
      preguntas.forEach(function (otra) {
        if (otra !== pregunta) {
          var otroPanel = document.getElementById(otra.getAttribute("aria-controls"));
          otra.setAttribute("aria-expanded", "false");
          if (otroPanel) otroPanel.hidden = true;
        }
      });

      pregunta.setAttribute("aria-expanded", String(!estaAbierta));
      panel.hidden = estaAbierta;
    });
  });

    /* --------------------------------------------------------
      3. FORMULARIO DE CONTACTO
      Valida y muestra un mensaje en pantalla; no hay backend todavía.
      Para conectarlo a un servicio real, ver README.md.
      -------------------------------------------------------- */
  var formulario = document.getElementById("formularioContacto");
  var estado = document.getElementById("estadoFormulario");

  // Reglas de validación por campo
  var reglas = {
    nombre: {
      validar: function (valor) { return valor.trim().length >= 3; },
      mensaje: "Escribe tu nombre completo."
    },
    correo: {
      validar: function (valor) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim()); },
      mensaje: "Escribe un correo electrónico válido."
    },
    telefono: {
      // Opcional: si está vacío se acepta; si trae algo, debe tener al menos 8 dígitos
      validar: function (valor) {
        var limpio = valor.replace(/\D/g, "");
        return limpio.length === 0 || limpio.length >= 8;
      },
      mensaje: "Revisa el número de teléfono."
    },
    servicio: {
      validar: function (valor) { return valor !== ""; },
      mensaje: "Selecciona el tipo de servicio."
    },
    mensaje: {
      validar: function (valor) { return valor.trim().length >= 10; },
      mensaje: "Cuéntanos un poco más sobre lo que necesitas."
    }
  };

  function mostrarError(campo, texto) {
    var contenedor = campo.closest(".campo");
    var error = document.getElementById("error-" + campo.id);
    if (contenedor) contenedor.classList.add("campo--invalido");
    campo.setAttribute("aria-invalid", "true");
    if (error) {
      error.textContent = texto;
      error.hidden = false;
    }
  }

  function limpiarError(campo) {
    var contenedor = campo.closest(".campo");
    var error = document.getElementById("error-" + campo.id);
    if (contenedor) contenedor.classList.remove("campo--invalido");
    campo.removeAttribute("aria-invalid");
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
  }

  function validarFormulario() {
    var primerCampoConError = null;

    Object.keys(reglas).forEach(function (id) {
      var campo = document.getElementById(id);
      if (!campo) return;

      if (reglas[id].validar(campo.value)) {
        limpiarError(campo);
      } else {
        mostrarError(campo, reglas[id].mensaje);
        if (!primerCampoConError) primerCampoConError = campo;
      }
    });

    if (primerCampoConError) {
      primerCampoConError.focus();
      return false;
    }
    return true;
  }

  if (formulario) {
    // Limpia el error de un campo en cuanto la persona lo corrige.
    function limpiarErrorAlEditar(evento) {
      var campo = evento.target;
      if (reglas[campo.id] && reglas[campo.id].validar(campo.value)) {
        limpiarError(campo);
      }
    }

    function validarCampoAlSalir(evento) {
      var campo = evento.target;
      if (!reglas[campo.id]) return;

      if (reglas[campo.id].validar(campo.value)) {
        limpiarError(campo);
      } else {
        mostrarError(campo, reglas[campo.id].mensaje);
      }
    }

    formulario.addEventListener("input", limpiarErrorAlEditar);
    formulario.addEventListener("change", limpiarErrorAlEditar);
    formulario.addEventListener("blur", validarCampoAlSalir, true);

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      if (estado) {
        estado.textContent = "";
        estado.classList.remove("formulario__estado--error");
      }

      if (!validarFormulario()) {
        if (estado) {
          estado.textContent = "Revisa los campos marcados.";
          estado.classList.add("formulario__estado--error");
        }
        return;
      }

      var datos = new FormData(formulario);
      var endpoint = formulario.getAttribute("data-endpoint");
      var boton = formulario.querySelector("button[type='submit']");

      if (boton) boton.disabled = true;

      // --- SIN BACKEND (estado actual) ---
      if (!endpoint) {
        console.log("Datos del formulario:", Object.fromEntries(datos.entries()));
        if (estado) {
          estado.textContent =
            "Formulario validado correctamente. El envío todavía no está conectado; configura el endpoint en index.html.";
        }
        formulario.reset();
        if (boton) boton.disabled = false;
        return;
      }

      // --- CON BACKEND (Formspree, webhook, API propia) ---
      if (estado) {
        estado.textContent = "Enviando...";
        estado.classList.remove("formulario__estado--error");
      }

      fetch(endpoint, {
        method: "POST",
        body: datos,
        headers: { "Accept": "application/json" }
      })
        .then(function (respuesta) {
          if (!respuesta.ok) throw new Error("Respuesta no válida del servidor");
          if (estado) estado.textContent = "Mensaje enviado. Te responderemos pronto.";
          formulario.reset();
        })
        .catch(function () {
          if (estado) {
            estado.textContent = "No se pudo enviar el mensaje. Escríbeme por WhatsApp o correo.";
            estado.classList.add("formulario__estado--error");
          }
        })
        .finally(function () {
          if (boton) boton.disabled = false;
        });
    });
  }

  /* --------------------------------------------------------
     4. AÑO DINÁMICO EN EL PIE
     -------------------------------------------------------- */
  var anio = document.getElementById("anioActual");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }
})();
