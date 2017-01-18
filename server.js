const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const bs = require('body-parser');

const hbs = handlebars.create({
	extname: '.hbs',
	defaultLayout: 'app'
});
const products = require('./routes/products');
const articles = require('./routes/articles');

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//method override
app.use(methodOverride('_method'));

//parse application/x-www-form-urlencoded
app.use(bs.urlencoded({ extended: false }));

//	Mount products and articles
app.use('/products', products);
app.use('/articles', articles);

// app.get('/articles', (req, res) => {
// 	res.render('articles/index');
// });

app.get('/', (req, res) => {
	res.render('index');
});

module.exports = app;