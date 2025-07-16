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
export function ajustarClaseSoloUnPaquete(contenedores) {
  Object.values(contenedores).forEach(contenedor => {
    if (!contenedor) return;

    const cantidad = contenedor.children.length;

    // Siempre eliminar clases antes de evaluar
    contenedor.classList.remove('solo-dos-paquetes', 'solo-un-paquete');
    
    // Aplica clase SOLO si hay exactamente 1 tarjeta (caso especial)
    if (cantidad === 1) {
      contenedor.classList.add('solo-un-paquete');
    }

    // Si hay más de una tarjeta, no aplicamos clases que limiten el ancho
  });
}

