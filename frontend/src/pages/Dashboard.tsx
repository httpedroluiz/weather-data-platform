import { useEffect, useState } from "react";
import { getWeather, getInsights } from "../api/weather";
import { InfoCard } from "../components/InfoCard";
import { Badge } from "@/components/ui/badge";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { EmptyState } from "../components/EmptyState";
import type { Weather } from "@/types/weather";
import type { WeatherInsights } from "@/types/insights";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/utils/download";
import { Navbar } from "@/components/Navbar"
import {
  formatDate,
  weatherCodeToText,
} from "@/utils/weather";
import {
  trendVariant,
  classificationVariant,
} from "@/utils/badgeVariants";

export function Dashboard() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [insights, setInsights] = useState<WeatherInsights | null>(null);
  const [weatherError, setWeatherError] = useState(false);
  const [insightsError, setInsightsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const isEmpty =
  !weather &&
  !insights &&
  !weatherError &&
  !insightsError;

  useEffect(() => {
    async function load() {
      try {
        const weatherData = await getWeather();
        setWeather(weatherData);
      } catch {
        setWeatherError(true);
      }

      try {
        const insightsData = await getInsights();
        setInsights(insightsData);
      } catch {
        setInsightsError(true);
      } finally {
        setLoading(false);
      }
    }

  load();
}, []);
  

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (isEmpty) {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <EmptyState
        title="Sem dados climáticos"
        message="Ainda não há registros de clima para exibir. Aguarde a próxima coleta."
      />
    </div>
  );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Dashboard
          </h1>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="text-foreground bg-blue-100 hover:bg-muted/80 transition-colors"
              onClick={() =>
                downloadFile(
                  `${import.meta.env.VITE_API_URL}/weather/export.csv`,
                  "weather-data.csv"
                )
              }
            >
              Exportar CSV
            </Button>

            <Button
              variant="outline"
              className="text-foreground bg-blue-100 hover:bg-muted/80 transition-colors"
              onClick={() =>
                downloadFile(
                  `${import.meta.env.VITE_API_URL}/weather/export.xlsx`,
                  "weather-data.xlsx"
                )
              }
            >
              Exportar XLSX
            </Button>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <InfoCard title="Clima Atual">
            {weather ? (
              <div className="space-y-2 text-sm">
                <p>
                  Temperatura: <strong>{weather.temperature}°C</strong>
                </p>

                <p>
                  Vento: {weather.windspeed} km/h
                </p>

                <p>
                  Condição:{" "}
                  <Badge variant="secondary">
                    {weatherCodeToText(weather.weatherCode)}
                  </Badge>
                </p>

                <p>Cidade: {weather.city || "Curitiba"}</p>
                <p>Umidade: {weather.humidity}%</p>
                <p>Nuvens: {weather.cloudCover}%</p>
                <p>Máx: {weather.temperatureMax}°C</p>
                <p>Mín: {weather.temperatureMin}°C</p>

                <p>Latitude: {weather.latitude}</p>
                <p>Longitude: {weather.longitude}</p>

                <p className="text-muted-foreground">
                  Registrado em {formatDate(weather.createdAt)}
                </p>
              </div> 
            ) : weatherError ? (
              <p className="text-sm text-destructive">
                Erro ao carregar dados climáticos.
              </p> 
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum dado climático disponível.
              </p>
            )}
          </InfoCard>

          <InfoCard title="Insights">
            {insights ? (
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Tendência:</strong>{" "}
                  <Badge variant={trendVariant(insights.trend)}>
                    {insights.trend}
                  </Badge>
                </p>

                <p>
                  <strong>Classificação:</strong>{" "}
                  <Badge variant={classificationVariant(insights.classification)}>
                    {insights.classification}
                  </Badge>
                </p>

                <p className="text-sm text-zinc-400">
                  {insights.summary}
                </p>
              </div> 
            ) : insightsError ? (
              <p className="text-sm text-destructive">
                Erro ao carregar insights.
              </p>
            )  : (
              <p className="text-sm text-muted-foreground">
                Nenhum insight disponível.
              </p>
            )}
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
