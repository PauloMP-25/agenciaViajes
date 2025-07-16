// js/paquetes/paquetesRender.js
/*==============================================================================
--Limpia el contenedor de tarjetas anteriores.
--Filtra los paquetes según la zona seleccionada.
--Crea dinámicamente tarjetas .card con:
  *Imagen del paquete.
  *Nombre del paquete
  *Descripción, precio, botón de reserva.
--Aplica animación de aparición con retardo.
--Oculta las secciones vacias
================================================================================= */
import { crearTarjetaPaquete } from './componentes/crearTarjetaPaquete.js';
import { ajustarClaseSoloUnPaquete } from './componentes/ajustarClaseSoloUnPaquete.js';
import { ocultarSeccionesVacias } from './componentes/ocultarSeccionesVacias.js';

/**
 * Renderiza las tarjetas de paquetes organizadas por secciones.
 * @param {Array} paquetes - Lista de objetos paquetes desde la base de datos.
 * @param {HTMLElement} contenedores - Contenedor donde se insertarán las tarjetas.
 * @param {string} filtroZona - Zona seleccionada para filtrar ('costa', 'sierra', 'selva', 'todos').
 */
export function renderPaquetes(paquetes, contenedores, filtroZona = "TODOS") {
  Object.values(contenedores).forEach(c => c?.classList.add("oculta"));

  setTimeout(() => {
    Object.values(contenedores).forEach(c => c.innerHTML = "");

    const paquetesFiltrados = paquetes.filter(p =>
      filtroZona === "TODOS" || p.nombre_zona?.toUpperCase() === filtroZona
    );

    paquetesFiltrados.forEach(paquete => {
      const contenedor = contenedores[paquete.seccion];
      if (!contenedor) return;

      const tarjeta = crearTarjetaPaquete(paquete);
      contenedor.appendChild(tarjeta);
    });

    ajustarClaseSoloUnPaquete(contenedores);
    ocultarSeccionesVacias(contenedores);
    Object.values(contenedores).forEach(c => c?.classList.remove("oculta"));
  }, 200);
}
