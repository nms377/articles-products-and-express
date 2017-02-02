const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();

const dbArticles = pgp({
	host: 'localhost',
	port: 5432,
	database: 'articles-products',
	user: 'nicolesandry',
	password: PG_PASS
});

module.exports = (function() {

// var articlesList = [];

function _getAllArticles(req, res){
	dbArticles.any('SELECT * FROM articles')
		.then( result => {
			res.render('articles/index', {"articlesList": result});
		})
		.catch( err => {
			res.send('Oops...');
		});
}

function _addArticle(req, res){
	let newArticle = req.body;
	let url_title = encodeURI(newArticle.title);

	dbArticles.none(`INSERT INTO articles (title, body, author, url_title) VALUES ('${newArticle.title}', '${newArticle.body}', '${newArticle.author}', '${url_title}')`)
	.then( articles => {
		console.log('newArticle', newArticle);
		res.redirect('/articles');
	})
	.catch( err => {
		console.log('err', err);
		console.log('newArticle', newArticle);
		res.redirect('/articles/new');
	});
}
	
function _getArticleByTitle(req, res){
	
	let getArticle = req.params.title;

	console.log('getArticle', getArticle);

	dbArticles.one(`SELECT * FROM articles WHERE title = '${getArticle}'`)
			.then( article => {
				console.log('getArticleByTitle', article);
				res.render('articles/article', {"getArticleByTitle": article});
			})
			.catch( err => {
				console.log('err', err);
				console.log(getArticle);
				res.redirect('/articles');
			});

}

function _editArticleByTitle(req, res){
	
	let editArticle = req.params.url_title;
	console.log('url_title', url_title);

	db.none(`UPDATE articles SET product_name = '${editArticle}', price = ${editArticle.title}, inventory = ${editArticle.body} WHERE url_title = ${editArticle.url_title}`)
			.then( (result) => {
				res.redirect(`../edit`);
			})
			.catch( err => {
				console.log('error', err);
				console.log('this didn\'t work');
			});

	// for(let i=0; i < articlesList.length; i++){
	// 		if(articlesList[i].title === title){
	// 			articlesList[i].title = data.title;
	// 			return articlesList[i];
	// 		}

	// 		if(articlesList[i].title === title){
	// 			articlesList[i].body = data.body;
	// 			return articlesList[i];
	// 		}
	// 	}
}

function _delete(data, title){
	for(let i=0; i < articlesList.length; i++){
		if(articlesList[i].title === parseInt(title)){
			console.log(articlesList[i]);
			articlesList.splice(i, 1);
			return articlesList;
		}
	}
}

	return {
		getAllArticles: _getAllArticles,
		addArticle: _addArticle,
		getArticleByTitle: _getArticleByTitle,
		editArticleByTitle: _editArticleByTitle,
		delete: _delete
	};

})();