// server/routes/consultaDestinos.js
/*==============================================================================
-- Archivo de rutas API para gestionar destinos turísticos.
-- Define endpoints HTTP para obtener todos los destinos o un destino por ID.
-- Se conecta a la base de datos PostgreSQL mediante pool.
-- Exporta un router que se importa en app.js para integrarse al servidor.
================================================================================= */
const express = require('express');
const router = express.Router();
const pool = require('../baseDeDatos/conexionDB');

router.get('/favicon.ico', (req, res) => res.status(204).end());

// GET /api/asientos/ocupados?destino_id=1
router.get('/ocupados', async (req, res) => {
  const { destino_id } = req.query;

  if (!destino_id) {
    return res.status(400).json({ error: "Falta el parámetro destino_id" });
  }

  try {
    const query = `
      SELECT asiento 
      FROM boleto 
      WHERE destino_id = $1 AND estado_boleto = 'confirmado'
    `;
    const result = await pool.query(query, [destino_id]);

    const asientosOcupados = result.rows.map(row => row.asiento);
    res.json({ ocupados: asientosOcupados });
  } catch (error) {
    console.error("❌ Error al obtener asientos ocupados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
