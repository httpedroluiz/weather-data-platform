import axios from "axios";
import type { Weather } from "@/types/weather";
import type { WeatherInsights } from "@/types/insights";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getWeather(): Promise<Weather | null> {
  const { data } = await api.get("/weather");
  return data ?? null;
}

export async function getInsights(): Promise<WeatherInsights | null> {
  const { data } = await api.get("/weather/insights");
  return data ?? null;
}

console.log("API URL:", import.meta.env.VITE_API_URL);
