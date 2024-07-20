import instance from "../instance";

export async function removeHistory(id: string) {
  await instance.delete(`histories/${id}`);
  return;
}
