import DynamoDB from 'aws-sdk/clients/dynamodb';
import * as fs from 'fs';
import path from 'path';

export function rowJsonLinesToObjcts(rowJsonLines: string) {
	const lines = rowJsonLines.split(/\n/).filter((line) => !!line); // 無
	const wrapped = '[' + lines.join(',') + ']';
	// console.log(wrapped);
	const obj = JSON.parse(wrapped);
	return obj;
}

type DynamoItem = {
	Item: {
		[key: string]: DynamoDB.AttributeValue;
	};
};

export function dynamoItemsToJsItems(items: DynamoItem[]) {
	return items.map((originalItem) => {
		return DynamoDB.Converter.unmarshall(originalItem.Item);
	});
}

export const itemsToCsv = (items: { [key: string]: any }[]): string => {
	const columns = extractColumns(items);
	const rows = generateRows(columns, items);
	const csv = generateCSV(columns, rows);
	return csv;

	// =========
	// Sub functions
	// =========
	function extractColumns(items: { [key: string]: any }[]) {
		const columns: { [key: string]: boolean } = {};
		for (const item of items) {
			for (const key of Object.keys(item)) {
				columns[key] = true;
			}
		}
		return Object.keys(columns).sort();
	}
	function generateRows(
		columns: string[],
		items: { [key: string]: any }[]
	): string[][] {
		return items.map((item) => {
			return columns.map((column) => {
				const strRow = JSON.stringify(item[column]) || '';
				return strRow.replace(',', '|');
			});
		});
	}
	function generateCSV(colmuns: string[], rows: { [key: string]: any }[]) {
		const strRows = rows.map((row) => row.join(','));
		const csv = `${colmuns.join(',')}\n${strRows.join('\n')}`;
		return csv;
	}
};

export const itemsToJson = (
	items: { [key: string]: any }[]
): { json: string; typescript: string } => {
	const json = JSON.stringify(items);
	const typescript = generateTypescript(items);
	return { json, typescript };

	// =========
	// Sub functions
	// =========
	function generateTypescript(items: { [key: string]: any }[]) {
		const definition: { [key: string]: string } = {};
		for (const item of items) {
			for (const [key, value] of Object.entries(item)) {
				if (!definition[key]) {
				}
				definition[key] = generateTypeDefinition(value);
			}
		}

		const rows = ['export interface Item {'];
		for (const [key, type] of Object.entries(definition)) {
			rows.push(`\t${key}?: ${type}`);
		}
		rows.push('};');

		return rows.join('\n');
	}

	function generateTypeDefinition(value: any): string {
		const t = typeof value;
		if (t === 'boolean') {
			return `boolean`;
		} else if (t === 'number') {
			return `number`;
		} else if (t === 'string') {
			return `string`;
		} else if (
			t === 'object' &&
			Array.isArray(value) &&
			typeof value[0] === 'string'
		) {
			return `string[]`;
		} else if (
			t === 'object' &&
			Array.isArray(value) &&
			typeof value[0] === 'number'
		) {
			return `number[]`;
		} else if (t === 'object' && Array.isArray(value)) {
			return `any[]`;
		} else if (value === null) {
			return `null`;
		} else if (t === undefined) {
			return `undefined`;
		} else {
			return `any`;
		}
	}
};

export function writeFile(fileName: string, content: string) {
	fs.writeFile(
		path.join(__dirname, '../outputs/', fileName),
		content,
		(err) => {
			console.log(err || 'done');
		}
	);
}
