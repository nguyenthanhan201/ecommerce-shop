import { post } from "lib/axios/requests";

export const loginWithGoogleAPI = async (name: string, email: string) => {
  const res = await post(`/auth/login`, { name, email });
  return res;
};