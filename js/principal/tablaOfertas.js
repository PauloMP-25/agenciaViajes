// public/activos/js/principal/tablaOfertas.js
// =============================
// tablaOfertas.js
// Muestra paquetes con promociones válidas hasta el último día del mes
// =============================
export function generarTablaOfertas(paquetes) {
  const tablaBody = document.querySelector("#tablaOfertas tbody");
  if (!tablaBody) return;

  tablaBody.innerHTML = "";

  // 🗓️ Último día del mes actual
  const hoy = new Date();
  const finDeMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
  const finDeMesStr = finDeMes.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // 🔍 Filtrar solo los paquetes válidos hasta el último día del mes
  const paquetesPromocion = paquetes.filter(p => p.fecha?.startsWith(finDeMesStr));


  if (paquetesPromocion.length === 0) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td colspan="5" style="text-align:center; font-weight: bold; padding: 1rem;">
        🎉 No hay promociones vigentes para este mes.
      </td>`;
    tablaBody.appendChild(fila);
    return;
  }

  // 🧱 Insertar cada fila
  paquetesPromocion.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre_destino.toUpperCase()}</td>
      <td>S/. ${p.precio}</td>
      <td>${p.nombre_zona.toUpperCase()}</td>
      <td>
        ${p.nombre.toUpperCase()}
        <span class="sello-promocion" title="Promoción válida este mes">2x1</span>
      </td>
      <td>${p.seccion.toUpperCase()}</td>
    `;
    tablaBody.appendChild(fila);
  });
}
