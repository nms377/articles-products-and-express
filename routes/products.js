//imports
const server = require('../server');
const express = require('express');

//invocations
const app = express();
const router = express.Router();

var productsArr = [];
var id = 1;

router.route('/')
	.get((req,res) => {
	console.log('products', productsArr);
	res.render('../templates/products/index', productsArr);
	res.json({"poducts": productsArr});
})
	.post((req, res) => {
		let product = req.body;
		product.id = `${id}`;
		productsArr.push(product);
		console.log(productsArr);
		id++;
		res.redirect(201, '/');
});

//edits product
function editProduct(productsArr, productID, body, newProductName){
	for(let i=0; i < productsArr.length; i++){
		if(productsArr[i].id === productID){
			productsArr[i].name = newProductName;
		}
	}
}

//deletes product
function deleteProduct(productsArr, productID, newProductName){
	for(let i=0; i < productsArr.length; i++){
		if(productsArr[i].id === productID){
			productsArr.splice(i, 1);
		}
	}
}

router.route('/:id')
	.put((req, res) => {
		let body = req.body;
		let newProductName = req.body.name;
		let productID = req.body.id;
		let newProduct = editProduct(productsArr, productID, body, newProductName);
		console.log(productsArr);
		res.redirect(201, '/:id');
})
	.delete((req,res) => {
		let newProductName = req.body.name;
		let productID = req.body.id;
		let newProduct = deleteProduct(productsArr, productID, newProductName);
		console.log(productsArr);
		res.redirect(201, '/');
});

module.exports = router;