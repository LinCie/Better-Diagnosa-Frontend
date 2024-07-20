import User from "../../interfaces/User";
import instance from "../instance";

export async function updateUser(id: string, data: Partial<User>) {
  const response = await instance.patch(`users/${id}`, data);
  return response.data as User;
}
