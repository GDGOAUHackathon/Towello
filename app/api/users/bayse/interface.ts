export interface BayseRequest {
  bayseEmail: string;
  baysePassword: string;
  apiName: string;
}

export interface BayseLoginResponse {
  token: string;
  userId: string;
  deviceId: string;
  message?: string;
  status?: number;
}
