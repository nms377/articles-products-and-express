//imports
const server = require('../server');
const express = require('express');
const products = require('../db/products');

//invocations
const app = express();
const router = express.Router();

router.route('/')
	.get((req,res) => {
	let productList = products.all();
	res.render('products/index', products);
})
	.post((req, res) => {
		products.add(req.body);
		res.redirect(201, '/');
});

//edits product
function editProduct(productsArr, productID, product, newProductName){
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
		let product = req.body;
		let newProductName = req.body.name;
		let productID = req.body.id;
		let newProduct = editProduct(productsArr, productID, product, newProductName);
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