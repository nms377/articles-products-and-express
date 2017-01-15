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