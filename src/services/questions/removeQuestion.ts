import instance from "../instance";

export async function removeQuestion(id: string) {
  await instance.delete(`questions/${id}`);
  return;
}
