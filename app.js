const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', {data: beersFromApi})) //As soon as getBeers works we render the page 'beers'. We change beersFromApi into an object so we can filter using the key and values.
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('randomBeer', {randomBeer: responseFromAPI[0]});
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
