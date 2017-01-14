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
	let productID = req.body.id;
	//loop through the array of objects
	for(let i=0; i < productsArr.length; i++){
		//loop through array and find the id that matches the id if it matches
		if(productsArr[i].id === productID){
				//then change the product name in that object
				productsArr[i].name = req.body.name;
		}
		console.log(productsArr[i].name);
	}
	// console.log(productsArr);
	res.send('test');
});

module.exports = router;