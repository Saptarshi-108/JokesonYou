import express from 'express';
import axios from 'axios';
import JokeAPI from 'sv443-joke-api'; 
const port = 3000;
const app = express();


app.use(express.json());


app.get('/joke', async (req, res) => {
  try {
    const joke = await JokeAPI.getJokes();
    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

