// reserva/asientos/visualizadorAsientos.js
import { fetchJSON } from "../../api/apiHelper.js"; 

export const obtenerAsientosOcupados = (destinoId) =>
  fetchJSON(`/api/asientos/ocupados?destino_id=${destinoId}`, null)
    .then(data => data.ocupados || [])
    .catch(error => {
      console.error("❌ Error al obtener asientos ocupados:", error);
      return [];
    });

