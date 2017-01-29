
const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'articles-products',
	user: 'nicolesandry',
	password: PG_PASS
});

module.exports = (function(){

	function _getAllProducts(req, res){

		db.any('SELECT * FROM products')
			.then( result => {
				res.render('products/index', {"productList": result});
			})
			.catch( err => {
				res.send('Oops...');
			});

	}

	function _addProduct(req, res){

		db.none(`INSERT INTO products (product_name, price, inventory) VALUES ('${req.body.name}', ${req.body.price}, ${req.body.inventory})`, req.body)
			.then( add => {
				res.redirect('/products');
			})
			.catch( err => {
				console.log('err', err);
				res.redirect('/products/new');
			});
	}


	function _getProductById(req, res){
		

		return db.one(`SELECT * FROM products WHERE id = ${req.params.id}`)
			.then( id => {
				console.log('getProductById', id);
				res.render('products/edit', {"productId": id});
			})
			.catch( err => {
				console.log('something happened');
			});

	}

	function _editProductById(req, res){

		db.none(`UPDATE products SET product_name = '${req.body.name}', price = ${req.body.price}, inventory = ${req.body.inventory} WHERE id = ${req.body.id}`)
			.then( (result) => {
				res.redirect(`../edit`);
			})
			.catch( err => {
				console.log('error', err);
				console.log('this didn\'t work');
			});
	}

	function _deleteProductById(req, res){

		db.none(`DELETE FROM products WHERE id = ${req.params.id}`)
			.then( () => {
				res.redirect('/products');
			})
			.catch( err => {
				console.log('Cannot delete product');
			});
	}

	return {
		getAllProducts: _getAllProducts,
		addProduct: _addProduct,
		getProductById: _getProductById,
		editProductById: _editProductById,
		deleteProductById: _deleteProductById
	};

})();