import instance from "../instance";

export async function refresh() {
  const refreshToken = localStorage.getItem("refresh_token");
  const response = await instance.post(
    "auth/refresh",
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } }
  );
  return response.data.access_token as string;
}
