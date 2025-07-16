// server/routes/consultaPaquetes.js
/*==============================================================================
-- Archivo de rutas API para gestionar destinos turísticos.
-- Define endpoints HTTP para obtener todos los destinos o un destino por ID.
-- Se conecta a la base de datos PostgreSQL mediante pool.
-- Exporta un router que se importa en app.js para integrarse al servidor.
================================================================================= */
const express = require('express');
const router = express.Router();
const pool = require('../baseDeDatos/conexionDB');

// 🚫 Ignorar favicon.ico para evitar errores molestos
router.get('/favicon.ico', (req, res) => res.status(204).end());

// 🔹 Obtener todos los paquetes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.paquete_id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.imagen,
        p.seccion,
        p.fecha_valido_hasta AS fecha,
        d.destino_id,
        d.nombre AS nombre_destino,
        z.nombre AS nombre_zona,
        z.icono,
        z.color
      FROM paquetes p
      JOIN destinos d ON p.destino_id = d.destino_id
      JOIN zona z ON z.zona_id = p.zona_id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener paquetes:", error.message);
    console.error("📛 Stack:", error.stack);
    res.status(500).json({ error: "Error al obtener paquetes" });
  }
});

// 🔸 Obtener paquetes por destino_id
router.get('/destino/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID inválido (debe ser numérico)' });
  }

  try {
    const result = await pool.query(`
      SELECT 
        paquete_id, 
        nombre, 
        seccion, 
        precio
      FROM paquetes
      WHERE destino_id = $1
    `, [parseInt(id)]);

    res.json(result.rows); // Puede ser []
  } catch (error) {
    console.error("❌ Error al obtener paquetes por destino:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
