//imports
const server = require('../server');
const express = require('express');
const articles = require('../db/articles');


//invocations
const app = express();
const router = express.Router();

router.route('/new')
	.get((req, res) => {
		res.render('articles/new');
});

router.route('/')
	//View Product List
	.get((req,res) => {
	let articlesList = articles.all();
	res.render('articles/index', {"articlesList": articlesList});
})
	//When you add a new product, this redirects you the product page to view your product list
	.post((req, res) => {
			let addArticle = articles.add(req.body);
			res.redirect('/articles');
});

router.route('/articles/:title')
	.get((req, res) => {
		let articleId = articles.getByTitle(req.body, req.params.title);
		res.redirect(303, `/articles/${req.params.title}`);
})
	.put((req, res) => {
		let editArticle = articles.edit(req.body, req.params.title);
		res.redirect(303, `/articles/${req.params.title}/edit`);
})
	.delete((req, res) => {
		let deleteArticle = articles.delete(req.body, req.params.title);
});		

router.route('/articles/:title/edit')
	.get((req, res) => {
		let editArticle = articles.edit();
		res.render('articles/edit', {"editArticle": editArticle});
});

module.exports = router;