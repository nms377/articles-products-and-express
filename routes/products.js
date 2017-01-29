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
		// console.log('get', req.body);
		products.getAllProducts(req, res);	
})
	//When you add a new product, this redirects you the product page to view your product list
	.post((req, res) => {
		// console.log('post', req.body);
		products.addProduct(req, res);
});

router.route('/:id')
	.delete((req,res) => {
		products.deleteProductById(req, res);
});

router.route('/:id/edit')	
	//View Product Page to Edit Product Based on Id
	.get((req, res) => {
		// console.log('/:id/edit base', req.params.id);
		products.getProductById(req, res);
	})
	.put((req, res) => {
		products.editProductById(req, res);
});

module.exports = router;