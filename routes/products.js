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
		console.log('get', req.body);
		products.getAllProducts(req, res);	
})
	//When you add a new product, this redirects you the product page to view your product list
	.post((req, res) => {

		console.log('post', req.body);

		products.addProduct(req, res);
});

router.route('/:id')
	//View Product Based on Id
	.get((req,res) => {

		console.log('req.body.id', req.params.id);

		products.editProductById(req.params.id)
			.then( id => {
				console.log('then', id);
				res.redirect(303, `/products/${id}/edit`);
			})
			.catch( err => {
				console.log('req.body err', req.body);
				res.send('you wrong');
			});

		// let productId = products.editProductById(req.body, req.params.id);
		// res.redirect(303, `/products/${req.params.id}/edit`);
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

		console.log('/:id/edit base', req.params.id);

		products.getProductById(req.params.id)
			.then( id => {
				console.log('/:id/edit', id);
				res.render('products/edit', {"productId": id});
			})
			.catch( err => {
				console.log('something happened');
			});

		// let productId = products.getProductById(req.body, req.params.id);
		// console.log(req.params.id);
		// res.render('products/edit', {"productId": productId});
	})

	.delete((req,res) => {
		products.deleteProductById(req.params.id);
		res.redirect('/products');
});

module.exports = router;