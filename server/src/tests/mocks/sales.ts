import { Sale } from '../../interfaces/sale';

export const mockSales: Sale[] = [
	{
		id: 'HASG-1234-ASDASD-1234',
		date: new Date('2021-01-01'),
		price: 100,
		typeId: 1,
		productId: '60e9b4f0f3f7b8b9b8b9b8b9',
		sellerId: '60e9b4f0f3f7b8b9b8b9b8b9',
		product: {
			id: '60e9b4f0f3f7b8b9b8b9b8b9',
			name: 'Fake product',
		},
		seller: {
			id: '60e9b4f0f3f7b8b9b8b9b8b9',
			name: 'Fake seller',
			type: 'Produtor',
		},
		transaction: {
			id: 1,
			description: 'Venda produtor',
			natureOfTransaction: 'Entrada',
		},
	},
];

export const mockSaleDTO = {
	date: new Date('2021-01-01'),
	price: 100,
	typeId: 1,
	product: 'Fake product',
	seller: 'Fake seller',
};

export const mockSale = mockSales[0];
