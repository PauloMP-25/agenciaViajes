// reserva/asientos/visualizadorAsientos.js
export function manejarSeleccionAsientos(cantidadPasajeros, onConfirmar) {
  const contenedor = document.getElementById("contenedorAsientos");

  const asientos = contenedor.querySelectorAll(".asiento:not(.ocupado)");

  asientos.forEach(asiento => {
    asiento.addEventListener("click", () => {
      const seleccionados = contenedor.querySelectorAll(".asiento.seleccionado");

      if (asiento.classList.contains("seleccionado")) {
        asiento.classList.remove("seleccionado", "asiento-flash");
      } else if (seleccionados.length < cantidadPasajeros) {
        asiento.classList.add("seleccionado", "asiento-flash");
      } else {
        const primero = seleccionados[0];
        primero.classList.remove("seleccionado", "asiento-flash");
        asiento.classList.add("seleccionado", "asiento-flash");
      }

      const actualizados = contenedor.querySelectorAll(".asiento.seleccionado");
      const texto = [...actualizados].map(a => a.dataset.numero).join(" – ");
      document.getElementById("asientosSeleccionados").textContent = texto;
    });
  });

  // ✅ Confirmación segura sin error
  const confirmarBtn = document.getElementById("confirmarReservaBtn");
  if (confirmarBtn) {
    confirmarBtn.addEventListener("click", () => {
      const seleccionados = [...contenedor.querySelectorAll(".asiento.seleccionado")]
        .map(a => a.dataset.numero);

      if (seleccionados.length === cantidadPasajeros) {
        if (typeof onConfirmar === "function") {
          onConfirmar(seleccionados);
        }
      } else {
        alert(`Debes seleccionar exactamente ${cantidadPasajeros} asiento(s).`);
      }
    });
  }
}
