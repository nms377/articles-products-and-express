const server = require('../server');
const express = require('express');
const app = express();
const router = express.Router();

//define the products route
router.get('/', (req,res) => {
	console.log('Sanity Test');
	res.send('Products Page');
});

module.exports = router;