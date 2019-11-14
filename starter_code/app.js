
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials")

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers})
    })
    .catch(error => {
      console.log(error)
    })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    const beer = beers[0] //its because how the api works!
    res.render('single-beer', {beer})
    })
    .catch(error => {
      console.log(error)
    })
});

app.get("/beers/:id", (req,res,next) =>{
  const beerNum = req.params.id
  punkAPI.getBeer(beerNum)
  .then(beers => {
    const beer = beers[0] //its because how the api works!
    //console.log(beer)
    res.render('single-beer.hbs',beer)
    })
    .catch(error => {
      console.log(error)
    })
  // const beer = punkAPI.getBeer(beerNum)
  // console.log(beer);
})



app.listen(3000);
