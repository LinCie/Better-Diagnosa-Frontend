import { refresh } from "../services/auth";

export async function accessTokenLoader() {
  const accessToken = await refresh();
  localStorage.setItem("access_token", accessToken);
  return;
}
