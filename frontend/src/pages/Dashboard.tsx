import { useEffect, useState } from "react";
import { getWeather, getInsights } from "../api/weather";
import { InfoCard } from "../components/InfoCard";
import { Badge } from "@/components/ui/badge";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { EmptyState } from "../components/EmptyState";
import {
  formatDate,
  weatherCodeToText,
} from "@/utils/weather";

export function Dashboard() {
  const [weather, setWeather] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const weatherData = await getWeather();
        const insightsData = await getInsights();

        setWeather(weatherData);
        setInsights(insightsData);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!weather) {
    return (
      <div className="p-10">
        <EmptyState
          title="Clima Atual"
          message="Nenhum dado climático disponível no momento."
        />
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="p-10">
        <EmptyState
          title="Insights"
          message="Nenhum insight disponível no momento."
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Weather Dashboard
      </h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <InfoCard title="Clima Atual">
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

            <p>Latitude: {weather.latitude}</p>
            <p>Longitude: {weather.longitude}</p>

            <p className="text-muted-foreground">
              Registrado em {formatDate(weather.createdAt)}
            </p>
          </div>
        </InfoCard>

        <InfoCard title="Insights">
          <p>
            <strong>Tendência:</strong>{" "}
            <Badge variant="outline">
              {insights.trend}
            </Badge>
          </p>

          <p>
            <strong>Classificação:</strong>{" "}
            <Badge>{insights.classification}</Badge>
          </p>
        </InfoCard>
      </div>
    </div>
  );
}
