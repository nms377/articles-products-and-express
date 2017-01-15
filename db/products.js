module.exports = (function(){

	var productsArr = [];
	let product = {productsArr};
	var id = 0;

	function _all(){
		console.log(productsArr);
		return productsArr;
	}

	function _add(data){
		data['id'] = id;
		productsArr.push(data);
		id++;
		console.log(productsArr);
	}

	function _getProductById(data, id){
		for(let i=0; i < productsArr.length; i++){
			if(productsArr[i].id === parseInt(id)){
				console.log(productsArr[i]);
				return productsArr[i];
			}
		}
	}

	function _editProductById(data, id){

		let productName = data.name;
		// will try to create a switch statement to be able to change the price and inventory
		// let prodcutPrice = data.price;
		// let productInventory = data.inventory;

		for(let i=0; i < productsArr.length; i++){
			if(productsArr[i].id === parseInt(id)){
				productsArr[i].name = productName;
			}
		}

		console.log('updated product list:', productsArr);
	}

	function _deleteProductById(id){
		for(let i=0; i < productsArr.length; i++){
			if(productsArr[i].id === parseInt(id)){
				productsArr.splice(i, 1);
			}
		}

		console.log('updated product list: ', productsArr);
	}

	return {
		all: _all,
		add: _add,
		getProductById: _getProductById,
		editProductById: _editProductById,
		deleteProductById: _deleteProductById
	};

})();