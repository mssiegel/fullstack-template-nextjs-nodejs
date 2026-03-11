import { getApiBaseUrl } from "../utils";
import { BackendErrorResponse } from "../types";

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
    const errorResponse = (await response.json()) as BackendErrorResponse;

    throw new Error(
      `Failed to register user: ${response.status}. Explanation: ${errorResponse.message}.`,
    );
  }

  return (await response.json()) as RegisterUserResponse;
}
