// js/api/apiHelper.js
/**
 * Función genérica para realizar peticiones fetch con manejo de errores.
 * Imprime logs para depuración global de llamadas API.
 *
 * @param {string} url - URL del endpoint
 * @param {any} defaultValue - Valor por defecto si hay error
 * @param {object} options - Opciones para fetch (headers, method, body, etc.)
 * @returns {Promise<any>}
 */
export async function fetchJSON(url, defaultValue = null, options = {}) {
  console.log(`🌐 Enviando solicitud a: ${url}`);
  if (options && Object.keys(options).length > 0) {
    console.log("📤 Opciones de la solicitud:", options);
  }

  try {
    const response = await fetch(url, options);

    console.log("📥 Estado de respuesta:", response.status);
    const contentType = response.headers.get("content-type");
    console.log("📥 Tipo de contenido:", contentType);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || `Error ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("❌ Error en fetchJSON:", error.message);
    return defaultValue;
  }
}
