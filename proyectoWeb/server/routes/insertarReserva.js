const express = require('express');
const router = express.Router();
const pool = require('../baseDeDatos/conexionDB');

router.post('/', async (req, res) => {
  const {
    origen,
    destino_id,
    paquete_id,
    horario,
    tipo_pago,
    total,
    pasajeros,
    asientos
  } = req.body;

  // Validación básica
  if (
    !origen || !destino_id || !horario || !tipo_pago || !total ||
    !Array.isArray(pasajeros) || !Array.isArray(asientos) || pasajeros.length !== asientos.length
  ) {
    return res.status(400).json({ mensaje: '❌ Datos incompletos o inválidos' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insertar reserva
    const resultReserva = await client.query(`
      INSERT INTO reserva (origen, destino_id, paquete_id, horario, tipo_pago, total)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING reserva_id
    `, [origen, destino_id, paquete_id || null, horario, tipo_pago, total]);

    const reserva_id = resultReserva.rows[0].reserva_id;

    // 2. Insertar cada pasajero y su boleto
    for (let i = 0; i < pasajeros.length; i++) {
      const pasajero = pasajeros[i];
      const asiento = asientos[i];

      // 2.1 Insertar pasajero (si ya existe, ignoramos)
      let pasajero_id;
      const resultExiste = await client.query(`
        SELECT pasajero_id FROM pasajero WHERE dni = $1
      `, [pasajero.dni]);

      if (resultExiste.rows.length > 0) {
        pasajero_id = resultExiste.rows[0].pasajero_id;
      } else {
        const resultPasajero = await client.query(`
          INSERT INTO pasajero (nombres, apellidos, fecha_nacimiento, dni)
          VALUES ($1, $2, $3, $4)
          RETURNING pasajero_id
        `, [
          pasajero.nombres,
          pasajero.apellidos,
          pasajero.fecha_nacimiento,
          pasajero.dni
        ]);
        pasajero_id = resultPasajero.rows[0].pasajero_id;
      }

      // 2.2 Insertar boleto
      await client.query(`
        INSERT INTO boleto (
          reserva_id, pasajero_id, destino_id, paquete_id,
          asiento, precio
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        reserva_id,
        pasajero_id,
        destino_id,
        paquete_id || null,
        asiento,
        total / pasajeros.length // precio unitario
      ]);
    }

    await client.query('COMMIT');
    res.status(201).json({ mensaje: '✅ Reserva registrada correctamente' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al registrar la reserva:', error);
    res.status(500).json({ mensaje: 'Error interno al guardar reserva' });
  } finally {
    client.release();
  }
});

module.exports = router;
