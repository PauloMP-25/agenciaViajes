/**
 * app.js
 * =============================================================================
 * PUNTO DE ENTRADA PRINCIPAL DEL SERVIDOR
 *
 * Este archivo configura la aplicación Express para:
 *  - Aplicar middlewares globales (CORS, manejo de JSON, etc.)
 *  - Servir archivos estáticos desde la carpeta 'public'
 *  - Registrar rutas API
 *  - Redirigir la raíz a la página principal
 *  - Manejar errores 404 (rutas no encontradas)
 * =============================================================================
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

// Crear la aplicación Express y establecer el puerto
const app = express();
const PORT = process.env.PORT || 3000;

// ========================
//  MIDDLEWARES GLOBALES
// ========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
// Esto permite que el navegador acceda a imágenes, CSS y JS desde la raíz.
app.use(express.static(path.join(__dirname, 'public')));

// ========================
//  RUTAS API
// ========================
const destinosRoute = require('./server/routes/consultaDestinos');
app.use('/api/destinos', destinosRoute);

const paquetesRoute = require('./server/routes/consultaPaquetes');
app.use('/api/paquetes', paquetesRoute);

const reservasDestinosRouter = require('./server/routes/reservasDestino');
app.use('/api/reservas/destinos', reservasDestinosRouter);

const reservasPaquetesRouter = require('./server/routes/reservasPaquetes');
app.use('/api/reservas/paquetes', reservasPaquetesRouter);

const asientosRoutes = require('./server/routes/consultaAsientos');
app.use('/api/asientos', asientosRoutes);

const insertarReserva = require('./server/routes/insertarReserva');
app.use('/api/insertarReserva', insertarReserva);

/*============================
    RUTA PRINCIPAL DEL SITIO
=============================*/
app.get('/', (req, res) => {
  res.redirect('/paginas/principal.html');
});

// ========================
//  MIDDLEWARE DE ERROR 404
// ========================
// Se ejecuta cuando ninguna ruta coincide
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

// ========================
//  INICIALIZAR EL SERVIDOR
// ========================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
