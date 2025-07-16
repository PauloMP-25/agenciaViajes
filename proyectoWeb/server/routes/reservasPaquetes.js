// server/routes/reservasPaquetes.js
/*==============================================================================
-- Archivo de rutas API para gestionar paquetes turísticos.
-- Define endpoints HTTP para:
     🔹 Obtener información completa de un paquete por su sección (vip, económico, ejecutivo)
     🔸 Obtener todos los paquetes asociados a un destino específico
-- Se conecta a la base de datos PostgreSQL mediante pool.
-- Exporta un router que se importa en app.js para integrarse al servidor.
==============================================================================*/
const express = require('express');
const router = express.Router();
const pool = require('../baseDeDatos/conexionDB');

// ✅ Obtener información de un paquete por ID, junto a su destino
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
        SELECT 
          p.paquete_id,
          p.seccion,
          p.precio,
          p.nombre,
          d.destino_id,
          d.nombre AS destino_nombre,
          d.precio AS precio_base,
          ARRAY_AGG(h.horario ORDER BY h.horario) AS horarios
        FROM paquetes p
        JOIN destinos d ON p.destino_id = d.destino_id
        LEFT JOIN horarios_destino h ON h.destino_id = d.destino_id
        WHERE p.paquete_id = $1
        GROUP BY p.paquete_id, p.seccion, p.precio, p.nombre, d.destino_id, d.nombre, d.precio
    `, [parseInt(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paquete no encontrado' });
    }

    const row = result.rows[0];
    res.json({
      paquete: {
        paquete_id: row.paquete_id,
        seccion: row.seccion,
        precio: row.precio,
        nombre: row.nombre
      },
      destino: {
        destino_id: row.destino_id,
        nombre: row.destino_nombre,
        precio_base: row.precio_base,
        horarios: row.horarios
      }
    });
  } catch (error) {
    console.error("❌ Error al obtener paquete:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
