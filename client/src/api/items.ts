export type Item = {
	id: number;
	name: string;
};

export async function getItems(): Promise<Item[]> {
	const response = await fetch("http://localhost:8000/api/items");

	if (!response.ok) {
		throw new Error(`Failed to fetch items: ${response.status}`);
	}

	return response.json() as Promise<Item[]>;
}
