import { post } from "../axios/requests";

export class AuthRepository {
  async getUserByEmail(name: string, email: string) {
    const res = await post(`/auth/getUserByEmail`, { name, email });
    return res;
  }

  async login(email: string) {
    const res = await post(`/auth/login`, { email });
    return res;
  }

  async token(email: string) {
    const res = await post(`/auth/token`, { email });
    return res;
  }
  
  async logout(email: string) {
    const res = await post(`auth/logout`, { email });
    return res;
  }
}
export const AuthServices = new AuthRepository();