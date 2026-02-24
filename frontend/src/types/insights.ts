export interface WeatherInsights {
  averageTemperature: number;
  trend: "subindo" | "caindo" | "estável";
  classification: string;
  alerts: string[];
  summary: string;
}