// js/destinos/destinosAPI.js
import { fetchJSON } from '../api/apiHelper.js';

/**
 * Obtiene todos los destinos turísticos almacenados en la base de datos.
 * Devuelve un array de destinos o [] en caso de error.
 */
export const fetchDestinos = () =>
  fetchJSON("/api/destinos", []);