const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get all stickers
app.get('/api/stickers', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM stickers');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stickers' });
  }
});

// Create a new order
app.post('/api/order', async (req, res) => {
  const { customer_name, customer_email, customer_address, sticker_id, quantity } = req.body;
  
  try {
    const query = 'INSERT INTO orders (customer_name, customer_email, customer_address, sticker_id, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [customer_name, customer_email, customer_address, sticker_id, quantity];
    const { rows } = await db.query(query, values);
    res.status(201).json({ message: 'Order received!', order: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
