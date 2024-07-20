import { History } from "../../interfaces";
import instance from "../instance";

export async function getAllHistory() {
  const response = await instance.get<History[]>("histories");
  return response.data;
}
