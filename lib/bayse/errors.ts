export class BayseApiError extends Error {
  readonly status: number;
  readonly body?: string;

  constructor(message: string, status: number, body?: string) {
    super(message);
    this.name = 'BayseApiError';
    this.status = status;
    this.body = body;
  }
}
