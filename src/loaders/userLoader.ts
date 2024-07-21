import { getUser } from "../services/users";

export async function userLoader() {
  const userId = localStorage.getItem("user_id");
  const accessToken = localStorage.getItem("access_token");
  if (userId && accessToken) {
    const user = await getUser(userId);
    return user;
  }
  return null;
}
