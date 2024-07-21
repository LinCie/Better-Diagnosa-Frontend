import { refresh } from "../services/auth";

export async function accessTokenLoader() {
  try {
    const accessToken = await refresh();
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }
    return;
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw error;
  }
}
