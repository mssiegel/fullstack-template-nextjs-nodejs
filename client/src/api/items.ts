import { getApiBaseUrl } from "../utils";

export type Item = {
  id: number;
  name: string;
};

export async function getItems(): Promise<Item[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/items`);

  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.status}`);
  }

  return response.json() as Promise<Item[]>;
}

export async function addItem(name: string): Promise<Item> {
  const response = await fetch(`${getApiBaseUrl()}/api/items`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to add item: ${response.status}, ${errorData?.message}`,
    );
  }

  return response.json() as Promise<Item>;
}
