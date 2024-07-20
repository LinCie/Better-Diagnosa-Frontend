import { Token } from "../../interfaces";
import instance from "../instance";

export async function login(username: string, password: string) {
  const response = await instance.post<Token>("auth/login", {
    username,
    password,
  });
  return response.data;
}
