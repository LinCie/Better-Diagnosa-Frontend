import { getUser } from "../services/users";

export async function userLoader() {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    const user = await getUser(userId);
    return user;
  }
  return null;
}
