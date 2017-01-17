//imports
const server = require('../server');
const express = require('express');
const products = require('../db/products');


//invocations
const app = express();
const router = express.Router();

//Create a Product
router.get('/new', (req, res) => {
	res.render('products/new');
});


router.route('/')
	//View Product List
	.get((req,res) => {
	let productList = products.all();
	console.log('productList 2', productList);
	res.render('products/index', {"productList": productList});
})
	//When you add a new product, this redirects you the product page to view your product list
	.post((req, res) => {
			let productId = products.add(req.body);
			let store = {
				productId: productId
			};
			res.redirect('/products');
});

router.route('/:id')
	//View Product Based on Id
	.get((req,res) => {
		let productId = products.editProductById(req.body, req.params.id);
		res.redirect(303, '/products/${req.params.id}/edit');
})
	//Edits Product and redirects client to Product page to view product based on Id
		.put((req, res) => {
	let productId	=	products.editProductById(req.body, req.params.id);
	let store = {
		'productId': productId
	};
		res.redirect(303, `/products/${req.params.id}/edit`);
});

router.route('/:id/edit')	
	//View Product Page to Edit Product Based on Id
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