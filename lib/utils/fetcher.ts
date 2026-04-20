import type { ApiResponse } from '@/types/api';

export async function apiGet<T>(
  path: string,
  getToken?: () => Promise<string | null>
): Promise<T> {
  const headers: HeadersInit = {};
  if (getToken) {
    const token = await getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(path, { headers, cache: 'no-store' });
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || json.error) {
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  if (json.data === null) {
    throw new Error(json.error ?? 'No data');
  }
  return json.data;
}
