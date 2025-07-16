// js/reservas/utilidades/validarFormularioPasajeros.js
/**
 * Recorre todos los formularios de pasajeros y valida campos obligatorios.
 * También calcula la edad de cada pasajero.
 * 
 * @returns {Array|false} Retorna arreglo de datos validados o false si hay error.
 */
export function validarFormulariosPasajeros() {
  const formularios = document.querySelectorAll("#passenger-sections form");
  const datos = [];

  for (let i = 0; i < formularios.length; i++) {
    const form = formularios[i];
    const tipo = i === 0 ? "PRINCIPAL" : "ADICIONAL";
    const nombres = form.querySelector('input[name="nombres"]')?.value.trim();
    const apellidos = form.querySelector('input[name="apellidos"]')?.value.trim();
    const fechaNacimiento = form.querySelector('input[name="fecha-nacimiento"]')?.value;
    const dni = form.querySelector('input[name="dni"]')?.value.trim();
    const destino = form.querySelector('select[name="destino"]')?.value;
    const horario = document.getElementById("horario")?.value;

    const esPrincipal = i === 0;

    // Solo se valida destino y horario en el formulario principal
    if (esPrincipal && !destino) {
      alert(`🧭 Debes seleccionar un DESTINO para el pasajero ${tipo}.`);
      return false;
    }

    if (esPrincipal && !horario) {
      alert(`🕒 Debes seleccionar un HORARIO para el pasajero ${tipo}.`);
      return false;
    }

    if (!nombres || nombres.length < 2) {
      alert(`👤 Ingresa un NOMBRE válido para el pasajero ${tipo}.`);
      return false;
    }

    if (!apellidos || apellidos.length < 2) {
      alert(`👤 Ingresa APELLIDOS válidos para el pasajero ${tipo}.`);
      return false;
    }

    if (!fechaNacimiento) {
      alert(`📅 Ingresa la FECHA DE NACIMIENTO del pasajero ${tipo}.`);
      return false;
    }

    if (!dni || dni.length < 6) {
      alert(`🪪 Ingresa un NÚMERO DE DNI válido para el pasajero ${tipo}.`);
      return false;
    }

    // Cálculo de edad
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear() - 
      (hoy.getMonth() < nacimiento.getMonth() || 
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate()) ? 1 : 0);

    datos.push({
      tipo,
      nombres,
      apellidos,
      fechaNacimiento,
      edad,
      dni
    });
  }

  return datos;
}
