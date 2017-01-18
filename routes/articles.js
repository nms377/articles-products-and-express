//imports
const server = require('../server');
const express = require('express');
const articles = require('../db/articles');


//invocations
const app = express();
const router = express.Router();

router.route('/')
	//View Product List
	.get((req,res) => {
	console.log('wat');
	res.render('articles/index');
})
	//When you add a new product, this redirects you the product page to view your product list
	.post((req, res) => {
			let addArticle = articles.add(req.body);
			let store = {
				addArticle: addArticle
			};
			res.redirect('/articles');
});

module.exports = router;