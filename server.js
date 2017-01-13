const express = require('express');
const app = express();

// const handlebars = require('express-handlebars');
const products = require('./routes/products');
// const articles = require('./routes/articles');

app.use('/products', products);

module.exports = app;