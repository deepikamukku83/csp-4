const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = response.data && response.data.drinks && response.data.drinks[0] ? response.data.drinks[0] : null;
    res.render('index', { cocktail, error: cocktail ? null : 'Failed to fetch cocktail. Please try again.' });
  } catch (error) {
    console.error('Error fetching cocktail:', error);
    res.render('index', { cocktail: null, error: 'Failed to fetch cocktail. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});