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
		articles.getAllArticles(req, res);
})
	.post((req, res) => {
		articles.addArticle(req, res);
});

router.route('/:title')
	.get((req, res) => {
		articles.getArticleByTitle(req, res);
		// res.render('articles', {"articleId": getArticleByTitle});
})
	.put((req, res) => {
		articles.editArticleByTitle(req, res);
})
	.delete((req, res) => {
		let deleteArticle = articles.delete(req.body, req.params.title);
});		

router.route('/articles/:title/edit')
	.get((req, res) => {
		articles.editArticleByTitle(req, res);
		// let editArticle = articles.edit();
		// res.render('articles/edit', {"editArticle": editArticle});
});

module.exports = router;