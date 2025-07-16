import { crearModalAsientos } from '../asientos/crearModalAsientos.js';
import { validarFormulariosPasajeros } from './validarFormularioPasajeros.js';

export function configurarBotonReserva() {
  const botonReservar = document.getElementById('botonReservar');
  if (!botonReservar) {
    console.error("❌ Botón 'botonReservar' no encontrado.");
    return;
  }

  botonReservar.addEventListener('click', async (e) => {
    e.preventDefault();

    const datosPasajeros = validarFormulariosPasajeros();
    if (!datosPasajeros) return;

    const cantidadPasajeros = datosPasajeros.length;
    const menor = datosPasajeros.find(p => p.edad < 18);
    const adulto = datosPasajeros.find(p => p.edad >= 18);

    if (menor && !adulto) {
      alert("Debe haber al menos un adulto para comprar pasajes.");
      return;
    }

    const destinoSelect = document.getElementById("destino");
    const destinoId = destinoSelect?.value;
    const destinoNombre = destinoSelect?.selectedOptions[0]?.textContent || "";

    if (!destinoId) {
      alert("Selecciona un destino antes de continuar.");
      return;
    }

    const horarioElement = document.getElementById("horario");
    if (!horarioElement || !horarioElement.value) {
      alert("Selecciona un horario antes de continuar.");
      return;
    }

    const precioInput = document.getElementById("precio")?.value || "0";
    const precioNumerico = parseFloat(precioInput.replace(/[^\d.]/g, "")) || 0;

    crearModalAsientos(
      cantidadPasajeros,
      destinoId,
      null, // el onConfirmar ya no se usa
      destinoNombre,
      precioNumerico
    );
  });
}
