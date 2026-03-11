import { getApiBaseUrl } from "../utils";

export type RegisterUserResponse = {
  success: boolean;
  data: Record<string, never>;
};

export async function registerUser(
  email: string,
  password: string,
): Promise<RegisterUserResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      `Failed to register user: ${response.status}, ${errorData?.message}`,
    );
  }

  return (await response.json()) as RegisterUserResponse;
}
