document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");

  // Evento principal: al enviar el formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // === 1. Capturar valores de campos ===
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // === 2. Limpiar errores previos ===
    limpiarErrores(form);

    let valido = true;

    // === 3. Validar Nombre ===
    if (nombre === "") {
      mostrarError("nombre", "Complete este campo.");
      valido = false;
    } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre) || nombre.length < 2) {
      mostrarError("nombre", "Ingrese un nombre válido.");
      valido = false;
    }

    // === 4. Validar Correo ===
    if (correo === "") {
      mostrarError("correo", "Complete este campo.");
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      mostrarError("correo", "Ingrese un correo válido.");
      valido = false;
    }

    // === 5. Validar Teléfono ===
    if (telefono === "") {
      mostrarError("telefono", "Complete este campo.");
      valido = false;
    } else if (!/^\d{9}$/.test(telefono)) {
      mostrarError("telefono", "El teléfono debe tener 9 dígitos.");
      valido = false;
    }

    // === 6. Validar Mensaje ===
    if (mensaje === "") {
      mostrarError("mensaje", "Complete este campo.");
      valido = false;
    }

    // === 7. Si todo es válido, enviar formulario ===
    if (valido) {
      alert("Formulario enviado correctamente ✅");
      form.reset();
    }
  });

  // === Función para mostrar errores debajo del campo inválido ===
  function mostrarError(inputOrId, mensaje) {
    let input, contenedor;

    if (typeof inputOrId === "string") {
      input = document.getElementById(inputOrId);
      contenedor = input.parentNode;
    } else {
      input = inputOrId;
      contenedor = input.parentNode;
    }

    // Evita duplicar errores
    let errorExistente = contenedor.querySelector(".error");
    if (!errorExistente) {
      const error = document.createElement("p");
      error.classList.add("error");
      error.style.color = "red";
      error.style.margin = "5px 0 0";
      error.textContent = mensaje;
      contenedor.appendChild(error);
    } else {
      errorExistente.textContent = mensaje;
    }

    input.classList.add("input-error");
  }

  // === Función para limpiar todos los errores antes de validar nuevamente ===
  function limpiarErrores(formulario) {
    const errores = formulario.querySelectorAll(".error");
    errores.forEach(e => e.remove());

    const camposConError = formulario.querySelectorAll(".input-error");
    camposConError.forEach(campo => campo.classList.remove("input-error"));
  }
});
