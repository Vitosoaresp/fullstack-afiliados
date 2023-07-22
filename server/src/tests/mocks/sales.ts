export const mockTypesOfTransactions = [
	{
		id: 1,
		name: 'Venda produtor',
		natureOfTransaction: 'Entrada',
	},
	// {
	// 	id: 2,
	// 	name: 'Venda afiliado',
	// 	natureOfTransaction: 'Entrada',
	// },
	// {
	// 	id: 3,
	// 	name: 'Comissão paga',
	// 	natureOfTransaction: 'saída',
	// },
	// {
	// 	id: 4,
	// 	name: 'Comissão recebida',
	// 	natureOfTransaction: 'Entrada',
	// },
];

export const mockSales = [
	{
		id: 'HASG-1234-ASDASD-1234',
		date: new Date('2021-01-01'),
		price: 100,
		typeId: 1,
		product: 'Fake product',
		seller: 'Fake seller',
		transaction: {
			id: 1,
			name: 'Venda produtor',
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
