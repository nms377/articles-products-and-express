
const PG_PASS = process.env.PG_PASS;
const pgp = require('pg-promise')();

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'products',
	user: 'nicolesandry',
	password: PG_PASS
});

module.exports = (function(){

	function _getAllProducts(req, res){

		console.log('db-all', req.body);

		db.any('SELECT * FROM products')
			.then( result => {
				console.log('result', result);
				res.render('products/index', {"productList": result});
			})
			.catch( err => {
				res.send('Oops...');
			});

	}

	function _addProduct(req, res){
		// data.id = id;
		// productsArr.push(data);
		// id++;
		// console.log('productsArr');

		console.log('db', req.body);
		console.log(typeof req.body.name);

		db.none(`INSERT INTO products (product_name, price, inventory) VALUES ('${req.body.name}', ${req.body.price}, ${req.body.inventory})`, req.body)
			.then( add => {
				console.log('add', add);
				res.redirect('/products');
			})
			.catch( err => {
				console.log('err', err);
				res.redirect('/products/new');
			});
	}


	function _getProductById(req, res){

		console.log("getProductById", req.params.id);

		return db.one(`SELECT * FROM products WHERE id = ${req.params.id}`)
			.then( id => {
				console.log('/:id/edit', id);
				res.render('products/edit', {"productId": id});
			})
			.catch( err => {
				console.log('something happened');
			});

	}

	function _editProductById(req, res){

		console.log('editProductById', req.body);
		console.log('editId', req.params.id);
		console.log('editProduct', req.body.id);

		db.none(`UPDATE products SET product_name = '${req.body.name}' WHERE id = ${req.body.id}`)
			.then( (result) => {
				console.log('check', req.params.id);
				console.log(result);
				res.redirect(`../edit`);
			})
			.catch( err => {
				console.log('error', err);
				console.log('this didn\'t work');
			});
	// })


		// let productName = data.name;
		// // will try to create a switch statement to be able to change the price and inventory
		// // let prodcutPrice = data.price;
		// // let productInventory = data.inventory;

		// for(let i=0; i < productsArr.length; i++){
		// 	if(productsArr[i].id === parseInt(id)){
		// 		productsArr[i].name = productName;
		// 		return productsArr[i];
		// 	}
		// }

		// console.log('updated product list:', productsArr);
	}

	function _deleteProductById(id){
		for(let i=0; i < productsArr.length; i++){
			if(productsArr[i].id === parseInt(id)){
				productsArr.splice(i, 1);
			}
		}

		console.log('updated product list: ', productsArr);
	}

	return {
		getAllProducts: _getAllProducts,
		addProduct: _addProduct,
		getProductById: _getProductById,
		editProductById: _editProductById,
		deleteProductById: _deleteProductById
	};

})();