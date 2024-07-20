import instance from "../instance";

export async function removeUser(id: string) {
  await instance.delete(`users/${id}`);
  return;
}
