// js/paquetes/componentes/crearTarjetaPaquete.js
export function crearTarjetaPaquete(paquete) {
  const card = document.createElement("div");
  card.classList.add("paquete-card");
  card.style.border = `2px solid ${paquete.color}`;

  if (paquete.nombre_zona) {
    card.classList.add(`zona-${paquete.nombre_zona.toLowerCase()}`);
  }

  let fechaHtml = "";
  if (paquete.fecha) {
    const fecha = new Date(paquete.fecha).toLocaleDateString("es-PE", {
      day: "numeric", month: "long", year: "numeric"
    });
    fechaHtml = `<div class="fecha-limite">🕒 Válido hasta: ${fecha}</div>`;
  }

  card.innerHTML = `
    <img src="http://localhost:3000/${paquete.imagen}" alt="${paquete.nombre}">
    <div class="contenido-card">
      <h3>
        ${paquete.nombre}
        <img src="http://localhost:3000/${paquete.icono}" alt="${paquete.nombre_zona}">
      </h3>
      <p>${paquete.descripcion}</p>
      <div class="precio-zona">
        <span class="precio">S/ ${paquete.precio}</span>
      </div>
    </div>
    <div class="info-inferior">
      ${fechaHtml}
      <a href="./reserva.html?destino_id=${paquete.destino_id}&paquete_id=${paquete.paquete_id}" class="boton-comprar">RESERVAR</a>
    </div>
  `;

  return card;
}
