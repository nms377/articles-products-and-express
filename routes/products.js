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
	products.all(req.body)
		.then( result => {
			console.log('result', result, 'req.body', req.body);
			res.render('products/index', {"productList": result});
		})
		.catch( err => {
			res.send('Oops...');
		});
})
	//When you add a new product, this redirects you the product page to view your product list
	.post((req, res) => {

		console.log('post', req.body);

		products.add(req.body)
			.then( add => {
				console.log('add', add);
				res.redirect('/products');
			})
			.catch( err => {
				console.log('err', err);
				res.redirect('/products/new');
			});
});

router.route('/:id')
	//View Product Based on Id
	.get((req,res) => {
		let productId = products.editProductById(req.body, req.params.id);
		res.redirect(303, `/products/${req.params.id}/edit`);
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
		// let store = {
		// 	'productId': productId
		// };
		console.log(req.params.id);
		res.render('products/edit', {"productId": productId});
	})

	.delete((req,res) => {
		products.deleteProductById(req.params.id);
		res.redirect('/products');
});

module.exports = router;