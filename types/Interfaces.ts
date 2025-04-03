export interface User {
  id: string;
  name: string;
  email: string;
  role: number;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}
