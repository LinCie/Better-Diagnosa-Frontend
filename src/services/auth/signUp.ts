import { Token } from "../../interfaces";
import instance from "../instance";

export async function signUp(username: string, password: string) {
  const response = await instance.post<Token>("auth/signup", {
    username,
    password,
  });
  return response.data;
}
