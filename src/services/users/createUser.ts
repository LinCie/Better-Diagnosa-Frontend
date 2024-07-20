import User from "../../interfaces/User";
import instance from "../instance";

export async function createUser(username: string, password: string) {
  const response = await instance.post("users", { username, password });
  return response.data as User;
}
