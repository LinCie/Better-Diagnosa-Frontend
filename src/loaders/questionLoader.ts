import { getAllQuestion } from "../services/questions";

export async function questionLoader() {
  return await getAllQuestion();
}
