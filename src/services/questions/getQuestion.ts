import { Question } from "../../interfaces";
import instance from "../instance";

export async function getQuestion(id: string) {
  const response = await instance.get<Question>(`questions/${id}`);
  return response.data;
}
