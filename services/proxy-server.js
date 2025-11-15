// proxy-server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const API_KEY = 'YOUR_ACTUAL_API_KEY';
const BASE_URL = 'https://api.rawg.io/api';

// Прокси для получения игр
app.get('/api/games', async (req, res) => {
  try {
    const { page = 1, page_size = 20, ordering = '-rating', search } = req.query;
    
    let url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${page_size}&ordering=${ordering}`;
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Прокси для поиска игр
app.get('/api/games/search', async (req, res) => {
  try {
    const { query, page = 1, page_size = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const url = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page=${page}&page_size=${page_size}`;
    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});