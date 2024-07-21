import { TokenWithUser } from "../../interfaces";
import instance from "../instance";

export async function login(username: string, password: string) {
  const response = await instance.post<TokenWithUser>("auth/login", {
    username,
    password,
  });
  return response.data;
}
