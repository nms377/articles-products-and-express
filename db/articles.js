module.exports = (function() {

var articlesList = [];

function _all(data){
	console.log(articlesList);
	return articlesList;
}

function _add(data){
	data.urlTitle = encodeURI(data.title);
	articlesList.push(data);
}
	
function _getByTitle(data, title){
		for(let i=0; i < articlesList.length; i++){
			if(articlesList[i].title === parseInt(title)){
				console.log(articlesList[i]);
				return articlesList[i];
			}
		}
}

function _edit(data, title){
	for(let i=0; i < articlesList.length; i++){
			if(articlesList[i].title === parseInt(title)){
				articlesList[i].title = data.title;
				return articlesList[i];
			}

			if(articlesList[i].urlTitle === parseInt(title)){
				articlesList[i].body = data.body;
				return articlesList[i];
			}
		}
}

function _delete(data, title){
	for(let i=0; i < articlesList.length; i++){
		if(articlesList[i].title === parseInt(title)){
			console.log(articlesList[i]);
			articlesList.splice(i, 1);
			return articlesList;
		}
	}
}

	return {
		all: _all,
		add: _add,
		getByTitle: _getByTitle,
		edit: _edit,
		delete: _delete
	};

})();