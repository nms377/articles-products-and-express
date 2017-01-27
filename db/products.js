
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

	function _all(products){

		console.log('db-all', products);

		return db.any('SELECT * FROM products');

	}

	function _add(add){
		// data.id = id;
		// productsArr.push(data);
		// id++;
		// console.log('productsArr');

		console.log('db', add);
		console.log(typeof add.name);

		return db.none(`INSERT INTO products (product_name, price, inventory) VALUES ('${add.name}', ${add.price}, ${add.inventory})`, add);
	}

	function _getProductById(data, id){
		for(let i=0; i < productsArr.length; i++){
			if(productsArr[i].id === parseInt(id)){
				console.log(productsArr[i]);
				return productsArr[i];
			}
		}
	}

	function _editProductById(data, id){

		let productName = data.name;
		// will try to create a switch statement to be able to change the price and inventory
		// let prodcutPrice = data.price;
		// let productInventory = data.inventory;

		for(let i=0; i < productsArr.length; i++){
			if(productsArr[i].id === parseInt(id)){
				productsArr[i].name = productName;
				return productsArr[i];
			}
		}

		console.log('updated product list:', productsArr);
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
		all: _all,
		add: _add,
		getProductById: _getProductById,
		editProductById: _editProductById,
		deleteProductById: _deleteProductById
	};

})();