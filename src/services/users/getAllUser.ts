import User from "../../interfaces/User";
import instance from "../instance";

export async function getAllUser() {
  const response = await instance.get("users");
  return response.data as User[];
}
