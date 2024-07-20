import { History } from "../../interfaces";
import instance from "../instance";

export async function createHistory(isDengue: boolean) {
  const response = await instance.post<History>("histories", { isDengue });
  return response.data;
}
