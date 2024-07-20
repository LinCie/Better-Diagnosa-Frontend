import { Question } from "../../interfaces";
import instance from "../instance";

export async function getAllQuestion() {
  const response = await instance.get<Question[]>("questions");
  return response.data;
}
