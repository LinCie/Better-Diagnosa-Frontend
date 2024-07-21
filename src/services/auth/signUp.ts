import { TokenWithUser } from "../../interfaces";
import instance from "../instance";

export async function signUp(username: string, password: string) {
  const response = await instance.post<TokenWithUser>("auth/signup", {
    username,
    password,
  });
  return response.data;
}
