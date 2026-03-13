const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Base de datos
const db = new sqlite3.Database(':memory:');

// Crear tabla de productos
db.serialize(() => {
  db.run(`CREATE TABLE productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripcion TEXT,
    precio REAL
  )`);

  // Insertar productos de ejemplo
  const stmt = db.prepare('INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)');
  stmt.run('Producto 1', 'Descripción del producto 1', 10.00);
  stmt.run('Producto 2', 'Descripción del producto 2', 20.00);
  stmt.run('Producto 3', 'Descripción del producto 3', 15.00);
  stmt.finalize();
});

// Rutas
app.get('/api/productos', (req, res) => {
  db.all('SELECT * FROM productos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/carrito', (req, res) => {
  // Simulación de carrito, en producción usar sesión o DB
  res.json({ message: 'Producto agregado al carrito' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});