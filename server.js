// server.js - servidor estático minimal para /skins/{player}.png
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 8000;
const SKIN_DIR = path.join(__dirname, 'skins');

// seguridad básica
app.use(helmet());

// logs de peticiones
app.use(morgan('combined'));

// servir solo la carpeta skins en la ruta /skins
app.use('/skins', express.static(SKIN_DIR, {
  extensions: ['png', 'jpg', 'jpeg'],
  maxAge: '1d',
  setHeaders: (res, path) => {
    // evitar que el navegador haga cache eterno durante pruebas
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
}));

// opcional: índice simple para ver archivos
app.get('/', (req, res) => {
  res.send(`<h3>Skins server</h3>
    <p>Put your images in the <code>/skins</code> folder and access them at <code>/skins/NAME.png</code></p>`);
});

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Skins server running on http://0.0.0.0:${PORT} - serving ${SKIN_DIR}`));
