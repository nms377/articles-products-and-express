const server = require('../server');
const supertest = require('supertest');
const chai = require('chai');
chai.should();

const agent = supertest.agent(server);

describe('Product API', () => {

	describe('GET /products', () => {

		it('should return an emptry object', done => {
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

	});

	// describe('GET /id', () => {

	// 	it('should return an id object', done => {
	// 		agent.get('/id')
	// 			.expect('Content-Type', /text\/html/)
	// 			// .expect(200)
	// 			.end((err, res) => {
	// 				if(err) throw err;

	// 				console.log( 'res.body', res.body);
	// 				res.body.should.have.property('id');
	// 				res.body.id.should.be.a('Number');

	// 				done();
	// 			});
	// 	});

	// });

});