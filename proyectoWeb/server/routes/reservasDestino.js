// server/routes/reservasDestino.js
/*==============================================================================
 Rutas para consultar destinos y sus paquetes asociados (usado en reservas)
==============================================================================*/
const express = require('express');
const router = express.Router();
const pool = require('../baseDeDatos/conexionDB');

router.get('/:id/con-paquetes', async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID inválido (debe ser numérico)' });
  }

  try {
    // 1. Obtener datos del destino + horarios
    const destinoResult = await pool.query(`
      SELECT 
        d.destino_id, 
        d.nombre, 
        d.precio AS precio_base,
        ARRAY_AGG(h.horario ORDER BY h.horario) AS horarios
      FROM destinos d
      LEFT JOIN horarios_destino h ON h.destino_id = d.destino_id
      WHERE d.destino_id = $1
      GROUP BY d.destino_id, d.nombre, d.precio
    `, [parseInt(id)]);

    if (destinoResult.rows.length === 0) {
      return res.status(404).json({ error: 'Destino no encontrado' });
    }

    const destino = destinoResult.rows[0];

    // 2. Obtener los paquetes relacionados
    const paquetesResult = await pool.query(`
      SELECT paquete_id, nombre, seccion, precio
      FROM paquetes
      WHERE destino_id = $1
    `, [parseInt(id)]);

    destino.paquetes = paquetesResult.rows;

    // 3. Responder con destino + paquetes
    res.json(destino);

  } catch (error) {
    console.error("❌ Error al obtener destino y paquetes:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
