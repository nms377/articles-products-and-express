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

function editProduct(productsArr, productID, newProductName){
	for(let i=0; i < productsArr.length; i++){
		if(productsArr[i].id === productID){
			productsArr[i].name = newProductName;
		}
	}
}

router.route('/:id')
	.put((req, res) => {
	let newProductName = req.body.name;
	let productID = req.body.id;
	let newProduct = editProduct(productsArr, productID, newProductName);
	console.log(productsArr);
	res.redirect(201, '/:id');
});

module.exports = router;