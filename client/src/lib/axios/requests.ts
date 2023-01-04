import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BE,
});

export const get = async (path: string, option: object = {}) => {
  const response = await request.get(path, option);
  return response.data;
}

export const post = async (path: string, body: object = {}) => {
  const response = await request.post(path, body);
  return response.data;
}

export default request;