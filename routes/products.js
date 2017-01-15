//imports
const server = require('../server');
const express = require('express');
const products = require('../db/products');
const productList = products.all();

//invocations
const app = express();
const router = express.Router();

router.route('/')
	.get((req,res) => {
	let productList = products.all();
	let store = {
		'productLists': productList
	};
	console.log('productList 2', productList);
	res.render('products/index', store);
})
	.post((req, res) => {
		products.add(req.body);
		res.redirect('/products');
});

router.route('/:id')
	.put((req, res) => {
		products.editProductById(req.body, req.params.id);
		res.redirect(201, '/:id');
})
	.delete((req,res) => {
		products.deleteProductById(req.params.id);
		res.redirect(201, '/');
});

module.exports = router;