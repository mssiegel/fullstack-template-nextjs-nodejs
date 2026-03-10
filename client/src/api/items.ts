export type Item = {
  id: number;
  name: string;
};

function getApiBaseUrl(): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

  // Avoid double slashes when joining with endpoint paths.
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add item: ${response.status}`);
  }

  return response.json() as Promise<Item>;
}
