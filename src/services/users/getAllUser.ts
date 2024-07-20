import { User } from "../../interfaces";
import instance from "../instance";

export async function getAllUser() {
  const response = await instance.get<User[]>("users");
  return response.data;
}
