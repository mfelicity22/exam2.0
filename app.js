import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { ageChecker } from './middlewares/ageCheck.js';
import { validator } from './middlewares/inputValidator.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = './product.json';

app.use(cors());
app.use(express.json());



// GET /products
app.get('/products', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read products' });
  }
});

// POST /products
app.post('/products', ageChecker, validator, async (req, res) => {
  try {
    const { name, price } = req.body;
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const products = JSON.parse(data);

    const newProduct = { id: Date.now(), name, price };
    products.push(newProduct);

    await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save product' });
  }
});


app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
