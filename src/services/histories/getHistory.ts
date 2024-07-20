import { History } from "../../interfaces";
import instance from "../instance";

export async function getHistory(id: string) {
  const response = await instance.get<History>(`histories/${id}`);
  return response.data;
}
