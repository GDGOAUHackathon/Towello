/**
 * API Types
 *
 * Responsibility: Standardize API request/response wrappers.
 * Owner: Backend Engineer
 * Implementation: Add pagination, filtering, and error handling structures.
 */

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}
