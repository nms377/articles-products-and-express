
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
				console.log('result', result, 'req.body', req.body);
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


	function _getProductById(id){

		console.log("getProductById", id);

		return db.one('SELECT * FROM products WHERE id = ${id}');

		// for(let i=0; i < productsArr.length; i++){
		// 	if(productsArr[i].id === parseInt(id)){
		// 		console.log(productsArr[i]);
		// 		return productsArr[i];
		// 	}
		// }
	}

	function _editProductById(id){

		console.log('editProductById', id);

		return db.one(`SELECT * FROM products WHERE id = ${id}`);


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