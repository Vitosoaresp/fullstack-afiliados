import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../app';
import SellerModel from '../../models/seller';
import { mockSeller, mockSellerDTO, mockSellers } from '../mocks/seller';

chai.use(chaiHttp);

describe('Integration: Sellers success', () => {
	before(() => {
		sinon.stub(SellerModel.prototype, 'getAll').resolves(mockSellers);
		sinon.stub(SellerModel.prototype, 'getById').resolves(mockSeller);
		sinon.stub(SellerModel.prototype, 'create').resolves(mockSeller);
	});

	after(() => {
		sinon.restore();
	});

	it('success for get all sellers', async () => {
		const response = await chai.request(app).get('/sellers');
		expect(response.status).to.be.equal(200);
		expect(response.body).to.be.an('array');
		expect(response.body).to.be.deep.equal(mockSellers);
	});

	it('success for get seller by id', async () => {
		const response = await chai
			.request(app)
			.get('/sellers/60e9b4f0f3f7b8b9b8b9b123');
		expect(response.status).to.be.equal(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal(mockSeller);
	});

	it('success for create a new seller', async () => {
		const response = await chai
			.request(app)
			.post('/sellers')
			.send(mockSellerDTO);
		expect(response.status).to.be.equal(201);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal(mockSeller);
	});
});

describe('Integration: Sellers error', () => {
	before(() => {
		sinon.stub(SellerModel.prototype, 'getAll').throws(new Error());
		sinon.stub(SellerModel.prototype, 'getById').resolves(null);
		sinon.stub(SellerModel.prototype, 'delete').throws(new Error());
	});

	after(() => {
		sinon.restore();
	});

	it('should return error for get all sellers', async () => {
		const response = await chai.request(app).get('/sellers');
		expect(response.status).to.be.equal(500);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			message: 'Internal Error',
		});
	});

	it('should return error for get seller by invalid id', async () => {
		const response = await chai
			.request(app)
			.get('/sellers/60e9b4f0f3f7b8b9b8b9b1234');
		expect(response.status).to.be.equal(404);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			error: 'id not found',
		});
	});

	it('should return error for create a new seller with invalid data', async () => {
		const response = await chai
			.request(app)
			.post('/sellers')
			.send({ name: 'test' });
		expect(response.status).to.be.equal(400);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			message: [
				{
					code: 'invalid_type',
					expected: 'string',
					message: 'Required',
					path: ['type'],
					received: 'undefined',
				},
			],
		});
	});

	it('should return error for update a new seller with invalid data', async () => {
		const response = await chai
			.request(app)
			.put('/sellers/60e9b4f0f3f7b8b9b8b9b1234')
			.send({ type: 'test' });
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

	it('should return error for delete a seller by Id', async () => {
		const response = await chai.request(app).delete('/sellers/123');
		expect(response.status).to.be.equal(500);
		expect(response.body).to.be.an('object');
		expect(response.body).to.be.deep.equal({
			message: 'Internal Error',
		});
	});
});
