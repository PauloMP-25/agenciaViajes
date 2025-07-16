// js/contacto/contactanosMain.js
import { initMap, cambiarUbicacion } from './mapaFunciones.js';
// Asegura que Google Maps pueda llamar initMap como global
window.initMap = initMap;

document.addEventListener("DOMContentLoaded", () => {
  const selectRegion = document.getElementById("region");
  if (!selectRegion) {
    console.warn("❌ No se encontró el elemento con id='region'");
    return;
  }

  selectRegion.addEventListener("change", () => {
    const regionSeleccionada = selectRegion.value;
    console.log("📍 Región seleccionada:", regionSeleccionada);
    cambiarUbicacion(regionSeleccionada);
  });
});