import { Question } from "../../interfaces";
import instance from "../instance";

export async function createQuestion(question: Partial<Question>) {
  const response = await instance.post<Question>("questions", question);
  return response.data;
}
