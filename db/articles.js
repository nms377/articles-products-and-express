module.exports = (function() {

var articlesList = [];

function _add(data){
	data.urlTitle = data.name;
	articlesList.push(data);
	console.log(articlesList);
}

	return {
		// all: _all,
		add: _add,
		// getByTitle: _getByTitle,
		// editByTitle: _editByTitle
	};

})();