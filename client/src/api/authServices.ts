import { post } from "lib/axios/requests";

export const getUserByEmailAPI = async (name: string, email: string) => {
  const res = await post(`/auth/getUserByEmail`, { name, email });
  return res;
};

export const loginAPI = async (email: string) => {
  const res = await post(`/auth/login`, { email });
  return res;
}

export const tokenAPI = async (email: string) => {
  const res = await post(`/auth/token`, { email });
  return res;
}

export const logoutAPI = async (email: string) => {
  const res = await post(`auth/logout`, { email });
  return res;
}