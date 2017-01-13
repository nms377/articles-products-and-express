const server = require('../server');
const supertest = require('supertest');
const chai = require('chai');

module.exports = (function() {



	return {
		all: _all,
		add: _add,
		getByTitle: _getByTitle,
		editByTitle: _editByTitle
	};

})();