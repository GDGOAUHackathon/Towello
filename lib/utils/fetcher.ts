import type { ApiResponse } from '@/types/api';

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path);
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || json.error) {
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  if (json.data === null) {
    throw new Error(json.error ?? 'No data');
  }
  return json.data;
}
