import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const { data } = await api.post("/users", {
    name,
    email,
    password,
  });

  return data;
}