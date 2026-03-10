import { getApiBaseUrl } from "../utils";

export type RegisterUserResponse = {
  message: string;
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
    throw new Error(`Failed to register user: ${response.status}`);
  }

  return response.json() as Promise<RegisterUserResponse>;
}
