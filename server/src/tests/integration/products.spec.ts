import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../app';
import ProductModel from '../../models/product';
import { mockProduct, mockProductDTO, mockProducts } from '../mocks/product';

chai.use(chaiHttp);

describe('Integration: Products success', () => {
	before(() => {
		sinon.stub(ProductModel.prototype, 'getAll').resolves(mockProducts);
		sinon.stub(ProductModel.prototype, 'getById').resolves(mockProduct);
		sinon.stub(ProductModel.prototype, 'create').resolves(mockProduct);
	});

	after(() => {
		sinon.restore();
	});

	it('success for get all products', async () => {
		const response = await chai.request(app).get('/products');
		expect(response.status).to.be.equal(200);
		expect(response.body).to.be.an('array');
		expect(response.body).to.be.deep.equal(mockProducts);
	});

	it.skip('success for get product by id', async () => {
		const response = await chai
			.request(app)
			.get('/product/60e9b4f0f3f7b8b9b8b9b123');
		expect(response.status).to.be.equal(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal(mockProduct);
	});

	it('success for create a new product', async () => {
		const response = await chai
			.request(app)
			.post('/products')
			.send(mockProductDTO);
		expect(response.status).to.be.equal(201);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal(mockProduct);
	});
});

describe('Integration: Products error', () => {
	before(() => {
		sinon.stub(ProductModel.prototype, 'getAll').throws(new Error());
		// sinon.stub(ProductModel.prototype, 'getById').resolves(null);
		sinon.stub(ProductModel.prototype, 'delete').throws(new Error());
	});

	after(() => {
		sinon.restore();
	});

	it('should return error for get all products', async () => {
		const response = await chai.request(app).get('/products');
		expect(response.status).to.be.equal(500);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			message: 'Internal Error',
		});
	});

	// it.skip('should return error for get product by invalid id', async () => {
	// 	const response = await chai
	// 		.request(app)
	// 		.get('/products/60e9b4f0f3f7b8b9b8b9b1234');
	// 	expect(response.status).to.be.equal(404);
	// 	expect(response.body).to.be.an('object');
	// 	expect(response.body).to.be.deep.equal({
	// 		error: 'id not found',
	// 	});
	// });

	it('should return error for create a new product with invalid data', async () => {
		const response = await chai.request(app).post('/products').send({});
		expect(response.status).to.be.equal(400);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			message: [
				{
					code: 'invalid_type',
					expected: 'string',
					message: 'Required',
					path: ['name'],
					received: 'undefined',
				},
			],
		});
	});

	it('should return error for update a new product with invalid data', async () => {
		const response = await chai
			.request(app)
			.put('/products/60e9b4f0f3f7b8b9b8b9b1234')
			.send({ quaquer: 'test' });
		expect(response.status).to.be.equal(400);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			message: [
				{
					code: 'invalid_type',
					expected: 'string',
					message: 'Required',
					path: ['name'],
					received: 'undefined',
				},
			],
		});
	});

	it('should return error for delete a product by Id', async () => {
		const response = await chai.request(app).delete('/products/123');
		expect(response.status).to.be.equal(500);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			message: 'Internal Error',
		});
	});
});
