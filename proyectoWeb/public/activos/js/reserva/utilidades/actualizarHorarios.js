// js/reservas/utilidades/clonarOpciones.js
/**
 * Inserta opciones de horario en el <select id="horario">
 * @param {string[]} horarios - Lista de horarios como strings
 */
export function actualizarHorarios(horarios) {
  const selectHorario = document.getElementById("horario");
  if (!selectHorario) {
    console.error("❌ No se encontró el select de horario.");
    return;
  }

  // Limpiar primero
  selectHorario.innerHTML = '<option value="">-- Selecciona un horario --</option>';

  horarios.forEach(hora => {
    const option = document.createElement("option");
    option.value = hora;
    option.textContent = hora;
    selectHorario.appendChild(option);
  });
}
