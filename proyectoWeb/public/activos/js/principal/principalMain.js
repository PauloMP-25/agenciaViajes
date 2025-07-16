// public/activos/js/principal/principalMain.js
// =============================
// principalMain.js
// Lógica principal al cargar la página
// =============================
import { fetchObtenerPaquetesDobles } from './principalAPI.js';
import { generarTablaOfertas } from './tablaOfertas.js';
import { iniciarCarrusel } from './carrusel.js';

document.addEventListener("DOMContentLoaded", async () => {
  iniciarCarrusel();
  const paquetes = await fetchObtenerPaquetesDobles();
  generarTablaOfertas(paquetes);
});
