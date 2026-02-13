import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getWeather() {
  const { data } = await api.get("/weather");
  return data;
}

export async function getInsights() {
  const { data } = await api.get("/weather/insights");
  return data;
}

console.log("API URL:", import.meta.env.VITE_API_URL);
