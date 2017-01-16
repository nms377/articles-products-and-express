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

router.get('/new', (req, res) => {
	let productList = products.all();
	let store = {
		'productLists': productList
	};
	res.render('products/new', store);
});

router.route('/:id')
	.get((req,res) => {
		let productId = products.getProductById(req.body, req.params.id);
		let store = {
			'productIds': productId,
			// 'id': req.body
		};
		res.render('products/product', store);
})
		.put((req, res) => {
	let productId	=	products.editProductById(req.body, req.params.id);
	let store = {
		'productId': productId
	};
		res.redirect(201, `/products/${req.params.id}`);
});

router.route('/:id/edit')	
	.get((req, res) => {
		let productId = products.getProductById(req.body, req.params.id);
		let store = {
			'productId': productId
		};
		console.log(req.params.id);
		res.render('products/edit', store);
	})

	.delete((req,res) => {
		products.deleteProductById(req.params.id);
		res.redirect('/products');
});

module.exports = router;