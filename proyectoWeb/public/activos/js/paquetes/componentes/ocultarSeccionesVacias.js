// js/paquetes/componentes/ajustarClaseSoloUnPaquete.js
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
export function ocultarSeccionesVacias(contenedores) {
  Object.entries(contenedores).forEach(([key, contenedor]) => {
    if (!contenedor) return;

    const seccion = contenedor.closest('.seccion-paquete');
    if (!seccion) return; // 🔐 Prevenir errores si no existe

    if (contenedor.children.length === 0) {
      seccion.style.display = "none";
    } else {
      seccion.style.display = "block";
    }
  });
}
