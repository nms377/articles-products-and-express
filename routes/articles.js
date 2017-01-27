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
	// console.log(req.body);
	res.render('articles/index', {"articlesList": articlesList});
})
	.post((req, res) => {
			let addArticle = articles.add(req.body, req.params);
			console.log('req.body.urlTitle', req.params);
			res.redirect('/articles');
});

router.route('/:title')
	.get((req, res) => {
		let articleId = articles.getByTitle(req.body, req.params.title);
		res.render('artciles', {"articleId": articleId});
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