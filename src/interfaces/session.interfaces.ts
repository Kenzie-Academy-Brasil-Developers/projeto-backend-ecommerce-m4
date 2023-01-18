export interface ISessionRequest {
  email: string;
  password: string;
}

export interface ISessionResponse {
  token: string;
}
