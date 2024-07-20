import { User } from "../../interfaces";
import instance from "../instance";

export async function updateUser(id: string, data: Partial<User>) {
  const response = await instance.patch<User>(`users/${id}`, data);
  return response.data;
}
