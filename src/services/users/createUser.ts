import { User } from "../../interfaces";
import instance from "../instance";

export async function createUser(username: string, password: string) {
  const response = await instance.post<User>("users", { username, password });
  return response.data;
}
