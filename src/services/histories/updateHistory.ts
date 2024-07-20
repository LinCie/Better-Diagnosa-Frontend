import { History } from "../../interfaces";
import instance from "../instance";

export async function updateHistory(isDengue: boolean) {
  const response = await instance.patch<History>("histories", { isDengue });
  return response.data;
}
