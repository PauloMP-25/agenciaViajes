// js/principal/principalAPI.js
import { fetchJSON } from '../api/apiHelper.js';

/**
 * Obtiene todos los paquetes desde el backend.
 * Solo incluye paquetes con seccion doble
 * Devuelve la lista como JSON o [] en caso de error.
 */

// ✅ Obtener los paquetes dobles
export const fetchObtenerPaquetesDobles = async () => {
  const paquetes = await fetchJSON("/api/paquetes", []);
  console.log(paquetes);
  return paquetes.filter(p => p.seccion === "doble");
};