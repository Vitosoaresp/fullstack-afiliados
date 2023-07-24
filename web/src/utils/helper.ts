import { Transaction } from '../types/seller';
import { SubmitTransaction } from '../types/transaction';

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

export function formatDataToJson(
	fileContent: string,
): SubmitTransaction[] | null {
	try {
		const lines: string[] = fileContent.split('\n');
		const jsonData: SubmitTransaction[] = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if (line.trim() === '') {
				// Ignorar linhas vazias
				continue;
			}

			const type = line.slice(0, 1).trim();
			const date = line.slice(1, 26).trim();
			const product = line.slice(26, 56).trim();
			const price = line.slice(56, 66).trim();
			const seller = line.slice(66, 86).trim();

			jsonData.push({
				typeId: Number(type),
				date: new Date(date),
				product,
				price: Number(price),
				seller,
			});
		}

		return jsonData;
	} catch (err) {
		console.log(err);
		return null;
	}
}
