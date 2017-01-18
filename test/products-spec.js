const server = require('../server');
const supertest = require('supertest');
const chai = require('chai');
chai.should();

const agent = supertest.agent(server);

describe('Product API', () => {

	describe('GET /products', () => {

		it('should return an empty object', done => {
			agent.get('/products')
				.expect('Content-Type', /text\/html/)
				.expect(200)
				.end((err, res) => {
					if(err) throw err;

					console.log('res.body', res.body);

					res.body.should.be.an('object');

					done();
				});
		});

		// it('should create a new product'){
			
		// }

	});

});