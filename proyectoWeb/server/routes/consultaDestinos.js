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

// 🚫 Ignorar favicon.ico para evitar error 404 innecesario
router.get('/favicon.ico', (req, res) => res.status(204).end());

// ✅ Obtener todos los destinos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT 
      d.destino_id,
      d.nombre,
      d.descripcion,
      d.precio,
      d.imagen,
      z.nombre AS zona,
      z.color AS color,
      COALESCE(json_agg(h.horario ORDER BY h.horario) FILTER (WHERE h.horario IS NOT NULL), '[]') AS horarios
    FROM destinos d
    JOIN zona z ON d.zona_id = z.zona_id
    LEFT JOIN horarios_destino h ON d.destino_id = h.destino_id
    GROUP BY d.destino_id, z.nombre, z.color
    ORDER BY d.nombre;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener destinos:", error.message);
    res.status(500).json({ error: "Error al obtener destinos" });
  }
});

// ✅ Obtener un destino por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID inválido (debe ser numérico)' });
  }

  try {
    const result = await pool.query(`
    SELECT 
      d.destino_id,
      d.nombre,
      d.descripcion,
      d.precio,
      d.imagen,
      z.nombre AS zona,
      z.color AS color,
      COALESCE(json_agg(h.horario ORDER BY h.horario) FILTER (WHERE h.horario IS NOT NULL), '[]') AS horarios
    FROM destinos d
    JOIN zona z ON d.zona_id = z.zona_id
    LEFT JOIN horarios_destino h ON d.destino_id = h.destino_id
    GROUP BY d.destino_id, z.nombre, z.color
    ORDER BY d.nombre;
    `, [parseInt(id)]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Destino no encontrado' });
    }
    res.json(result.rows[0]); // Devuelve solo un objeto
  } catch (error) {
    console.error("❌ Error al obtener destino por ID:", error.message);
    res.status(500).json({ error: "Error al obtener destino por ID" });
  }
});

module.exports = router;