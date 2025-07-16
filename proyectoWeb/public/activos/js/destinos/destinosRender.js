// js/destinos/destinosRender.js
/*==============================================================================
--Limpia el contenedor de tarjetas anteriores.
--Filtra los destinos según la zona seleccionada.
--Crea dinámicamente tarjetas .card con:
  *Imagen del destino.
  *Nombre del destino + ícono de zona.
  *Descripción, precio, botón de compra.
--Aplica animación de aparición con retardo.
================================================================================= */
/**
 * Renderiza dinámicamente las tarjetas de destinos turísticos.
 * @param {Array} destinos - Lista de objetos destino desde la base de datos.
 * @param {HTMLElement} contenedor - Contenedor donde se insertarán las tarjetas.
 * @param {string} filtroZona - Zona seleccionada para filtrar ('costa', 'sierra', 'selva', 'todos').
 */
export function renderDestinos(destinos, contenedor, filtroZona = "todos") {
  // Validación de tipo para filtroZona
  let lowerCaseFiltro = "todos";
  if (typeof filtroZona === 'string') {
    lowerCaseFiltro = filtroZona.toLowerCase();
  } else {
    console.warn("⚠️ filtroZona no es un string:", filtroZona);
    lowerCaseFiltro = String(filtroZona).toLowerCase();
  }

  // Oculta temporalmente todas las cartas actuales para reiniciar la animación
  contenedor.querySelectorAll(".card").forEach(card => {
    card.classList.add("oculta");
  });

  // Limpia el contenedor antes de insertar nuevas tarjetas
  setTimeout(() => {
    contenedor.innerHTML = "";

  // Filtra destinos según la zona seleccionada (o muestra todos)
    const filtrados = destinos.filter(destino =>
      lowerCaseFiltro === "todos" || destino.zona.toLowerCase() === lowerCaseFiltro
    );

    filtrados.forEach((destino, i) => {
      // Crear tarjeta HTML para cada destino
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("card", "oculta");
      tarjeta.id = `carta-${destino.nombre.toUpperCase()}`;

      // Se utiliza el color asignado desde la base de datos para el borde
      tarjeta.style.border = `3px solid ${destino.color}`;

      // Determinar zona y su ícono correspondiente
      const zonasValidas = ["costa", "sierra", "selva"];
      const zona = destino.zona ? destino.zona.toLowerCase() : "costa";
      const iconoZona = zonasValidas.includes(zona) ? zona : "costa";
      const icono = `activos/img/zonas/icono-${iconoZona}.svg`;

      // ✅ Formatear horarios en formato amigable
      const horarios = destino.horarios?.length > 0
        ? destino.horarios.map(h => h.slice(0, 5)).join(" | ") // "08:00" | "20:00"
        : "Sin horarios";
      // Plantilla HTML de la tarjeta del destino
      const precio = destino.precio || 0;

      tarjeta.innerHTML = `
        <img src="http://localhost:3000/${destino.imagen}" alt="${destino.nombre}">
        <h3>
          ${destino.nombre}
          <img src="http://localhost:3000/${icono}" alt="${destino.zona}">
        </h3>
        <p>${destino.descripcion}</p>
        <p class="horario-salida"><strong>Horarios:</strong> ${horarios}</p>
        <div class="precio">PRECIO <span>S/${destino.precio}</span></div>
        <a href="/paginas/reserva.html?destino_id=${destino.destino_id}" class="boton-comprar">
          COMPRAR
        </a>
      `;

      // Agregar la tarjeta al contenedor
      contenedor.appendChild(tarjeta);

      // Mostrar la tarjeta con animación
      setTimeout(() => {
        tarjeta.classList.remove("oculta");
      }, 100 + i * 80);
    });
  }, 300);
}

