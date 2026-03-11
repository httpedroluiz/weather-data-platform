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
import {
  Thermometer,
  Droplets,
  Wind,
  Cloud,
  MapPin,
  CalendarClock,
  Navigation,
  CloudSun,
  Ruler,
  Info,
} from "lucide-react";

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

  const formatTemp = (value: number | null | undefined) =>
    typeof value === "number" ? `${value}°C` : "—";

  const formatPercent = (value: number | null | undefined) =>
    typeof value === "number" ? `${value}%` : "—";

  const formatKmh = (value: number | null | undefined) =>
    typeof value === "number" ? `${value} km/h` : "—";

  const formatCoord = (value: string | number | null | undefined) => {
    const n =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? Number.parseFloat(value)
          : NaN;
    return Number.isFinite(n) ? n.toFixed(5) : "—";
  };

  const minMaxText =
    weather && typeof weather.temperatureMin === "number" && typeof weather.temperatureMax === "number"
      ? `${weather.temperatureMin}°/${weather.temperatureMax}°`
      : "—";

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

        <div className="space-y-6">
          {weather ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <InfoCard
                title="Temperatura"
                icon={<Thermometer className="h-5 w-5" />}
              >
                <div className="text-xl font-semibold">
                  {formatTemp(weather.temperature)}
                </div>
              </InfoCard>

              <InfoCard
                title="Humidade"
                icon={<Droplets className="h-5 w-5" />}
              >
                <div className="text-xl font-semibold">
                  {formatPercent(weather.humidity)}
                </div>
              </InfoCard>

              <InfoCard
                title="Vento"
                icon={<Wind className="h-5 w-5" />}
              >
                <div className="text-xl font-semibold">
                  {formatKmh(weather.windspeed)}
                </div>
              </InfoCard>

              <InfoCard
                title="Nuvens"
                icon={<Cloud className="h-5 w-5" />}
              >
                <div className="text-xl font-semibold">
                  {formatPercent(weather.cloudCover)}
                </div>
              </InfoCard>

              <InfoCard
                title="Min/Max"
                icon={<Ruler className="h-5 w-5" />}
              >
                <div className="text-xl font-semibold">
                  {minMaxText}
                </div>
              </InfoCard>

              <InfoCard
                title="Condição"
                icon={<CloudSun className="h-5 w-5" />}
              >
                <div className="text-xl font-semibold">
                  
                    {weatherCodeToText(weather.weatherCode)}
                  
                </div>
              </InfoCard>

              <InfoCard
                title="Localização"
                icon={<MapPin className="h-5 w-5" />}
              >
                <div className="text-xl font-semibold">
                  {weather.city || "Curitiba"}
                </div>
              </InfoCard>

              <InfoCard
                title="Detalhes"
                icon={<Info className="h-5 w-5" />}
              >
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    <span className="tabular-nums">
                      {formatCoord(weather.latitude)}, {formatCoord(weather.longitude)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4" />
                    <span>{formatDate(weather.createdAt)}</span>
                  </div>
                </div>
              </InfoCard>
            </div>
          ) : weatherError ? (
            <InfoCard title="Weather" icon={<CloudSun className="h-5 w-5" />}>
              <p className="text-sm text-destructive">
                Erro ao carregar dados climáticos.
              </p>
            </InfoCard>
          ) : (
            <InfoCard title="Weather" icon={<CloudSun className="h-5 w-5" />}>
              <p className="text-sm text-muted-foreground">
                Nenhum dado climático disponível.
              </p>
            </InfoCard>
          )}

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
