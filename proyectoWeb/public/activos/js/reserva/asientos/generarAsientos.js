// reserva/asientos/visualizadorAsientos.js
export async function generarAsientos(cantidadPasajeros, asientosOcupados = []) {
  const contenedor = document.getElementById("contenedorAsientos");
  contenedor.innerHTML = "";

  let numeroAsiento = 1;

  // Crear grid principal de asientos
  const gridPrincipal = document.createElement("div");
  gridPrincipal.classList.add("bus-asientos");

  for (let fila = 0; fila < 6; fila++) {
    for (let col = 0; col < 5; col++) {
      if (col === 2) {
        const espacioPasillo = document.createElement("div");
        espacioPasillo.classList.add("pasillo");
        gridPrincipal.appendChild(espacioPasillo);
      } else {
        const asiento = document.createElement("div");
        asiento.classList.add("asiento");
        asiento.dataset.numero = numeroAsiento;
        asiento.textContent = numeroAsiento;

        if (asientosOcupados.includes(numeroAsiento.toString())) {
          asiento.classList.add("ocupado");
        }

        gridPrincipal.appendChild(asiento);
        numeroAsiento++;
      }
    }
  }

  contenedor.appendChild(gridPrincipal); // Primero la grilla principal

  // Fila final centrada: 4 asientos (29–32)
  const filaFinal = document.createElement("div");
  filaFinal.classList.add("fila-final-asientos");

  for (let i = 0; i < 4; i++) {
    const asiento = document.createElement("div");
    asiento.classList.add("asiento");
    asiento.dataset.numero = numeroAsiento;
    asiento.textContent = numeroAsiento;

    if (asientosOcupados.includes(numeroAsiento.toString())) {
      asiento.classList.add("ocupado");
    }

    filaFinal.appendChild(asiento);
    numeroAsiento++;
  }

  contenedor.appendChild(filaFinal); // Luego la fila final como bloque separado
}
