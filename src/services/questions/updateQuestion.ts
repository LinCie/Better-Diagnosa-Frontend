import { Question } from "../../interfaces";
import instance from "../instance";

export async function updateQuestion(id: string, question: Partial<Question>) {
  const response = await instance.patch<Question>(`questions/${id}`, question);
  return response.data;
}
