import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
}