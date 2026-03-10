export function getApiBaseUrl(): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

  // Avoid double slashes when joining with endpoint paths.
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}
