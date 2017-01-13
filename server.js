const express = require('express');
const app = express();
const bs = require('body-parser');

// const handlebars = require('express-handlebars');
const products = require('./routes/products');
// const articles = require('./routes/articles');

//parse application/x-www-form-urlencoded
app.use(bs.urlencoded({ extended: false }));

app.use('/products', products);

module.exports = app;