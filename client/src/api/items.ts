import { getApiBaseUrl } from "../utils";

export type Item = {
  id: number;
  name: string;
};

type GetItemsResponse = {
  success: boolean;
  data: {
    items: Item[];
  };
};

type AddItemResponse = {
  success: boolean;
  data: {
    item: Item;
  };
};

export async function getItems(): Promise<Item[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/items`);

  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.status}`);
  }

  const payload = (await response.json()) as GetItemsResponse;
  return payload.data.items;
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

  const payload = (await response.json()) as AddItemResponse;
  return payload.data.item;
}
