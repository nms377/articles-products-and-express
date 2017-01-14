const server = require('../server');
const express = require('express');

const app = express();
const router = express.Router();

var productsArr = [];
var id = 1;

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

function deleteProduct(productsArr, productID, newProductName){
	for(let i=0; i < productsArr.length; i++){
		if(productsArr[i].id === productID){
			productsArr.splice(i, 1);
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
})
	.delete((req,res) => {
		let newProductName = req.body.name;
		let productID = req.body.id;
		let newProduct = deleteProduct(productsArr, productID, newProductName);
		console.log(productsArr);
		res.redirect(201, '/');
});

module.exports = router;