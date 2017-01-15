module.exports = (function(){

	let product = {};
	var productsArr = [];
	var id = 0;

	function _all(){
		return productsArr;
	}

	function _add(data){
		data['id'] = id;
		productsArr.push(data);
		id++;
		console.log(productsArr);
	}

	function _editProductById(data, id){

		let productName = data.name;

		for(let i=0; i < productsArr.length; i++){
			console.log(productsArr[i].id);
			if(productsArr[i].id === parseInt(id)){
				productsArr[i].name = productName;
				console.log(productsArr[i]);
			}else{
				console.log('error');
			}
		}

	}

	return {
		all: _all,
		add: _add,
		editProductById: _editProductById,
		// deleteProductById: _deleteProductById
	};

})();