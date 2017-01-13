const server = require('../server');
const express = require('express');

const app = express();
const router = express.Router();

var productsArr = [];

//define the products route
router.route('/')
	.get((req,res) => {
	console.log('products', productsArr);
	res.json({"products": productsArr});
})
	.post((req, res) => {
		productsArr.push(req.body);
		console.log('Products Added');
		res.send('Let\'s create a new product!');
})
	.put((req, res) => {
		res.send('This puts shit somewhere');
});

module.exports = router;