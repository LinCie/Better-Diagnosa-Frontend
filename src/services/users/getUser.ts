import User from "../../interfaces/User";
import instance from "../instance";

export async function getUser(id: string) {
  const response = await instance.get(`users/${id}`);
  return response.data as User;
}
