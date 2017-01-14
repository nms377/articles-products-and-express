const server = require('../server');
const express = require('express');

const app = express();
const router = express.Router();

var productsArr = [];
var id = 0;

//define the products route
router.route('/')
	.get((req,res) => {
	console.log('products', productsArr);
	res.json({"products": productsArr});
})
	.post((req, res) => {
		let product = req.body;
		product.id = `${id}`;
		productsArr.push(product);
		console.log(productsArr);
		id++;
		res.redirect(201, '/');
});

router.route('/:id')
	.put((req, res) => {
	for(let i=0; i < productsArr.length; i++){
		if(productsArr.indexOf(i)){
			productsArr[i].name = req.body.name;
		}

	}
	console.log(productsArr);
	res.send('Test');
});

module.exports = router;