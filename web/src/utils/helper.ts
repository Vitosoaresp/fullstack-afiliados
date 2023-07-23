import { Transaction } from '../types/transaction';

enum OperationType {
	VENDA_PRODUTOR = 1,
	VENDA_AFILIADO = 2,
	COMISSAO_PAGA = 3,
	COMISSAO_RECEBIDA = 4,
}

export const getTypeOperationValue = (type: number) => {
	switch (type) {
		case OperationType.VENDA_PRODUTOR:
			return 'Venda Produtor';
		case OperationType.VENDA_AFILIADO:
			return 'Venda Afiliado';
		case OperationType.COMISSAO_PAGA:
			return 'Comissão Paga';
		case OperationType.COMISSAO_RECEBIDA:
			return 'Comissão Recebida';
		default:
			return 'N/A';
	}
};

export const formatValue = (value: number) => {
	return (value / 100).toLocaleString('pt-br', {
		style: 'currency',
		currency: 'BRL',
	});
};

export const getComissionValue = (transactions: Transaction[]) => {
	const comission = transactions.reduce((acc, transaction) => {
		if (transaction.typeId === OperationType.COMISSAO_PAGA) {
			return acc - transaction.price;
		}
		return acc + transaction.price;
	}, 0);

	return formatValue(comission);
};
