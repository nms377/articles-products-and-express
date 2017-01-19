module.exports = (function() {

var articlesList = [];

function _add(data){
	data.urlTitle = encodeURI(data.title);
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