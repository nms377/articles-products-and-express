module.exports = (function(){

	let product = {};
	var _productsArr = [];
	var id = 0;

	function _all(){
		return _productsArr;
	}

	function _add(data){
		data['id'] = id;
		_productsArr.push(data);
		id++;
		console.log(_productsArr);
	}

	return {
		all: _all,
		add: _add,
		// editProductById: _editProductById,
		// deleteProductById: _deleteProductById
	};

})();