import { useEffect, useState } from "react";
import { getWeather, getInsights } from "../api/weather";
import { InfoCard } from "../components/InfoCard";

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
    return (
      <div className="p-10 text-xl">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Weather Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard title="Clima Atual">
          <div className="space-y-2 text-sm">
            <p>Temperatura: {weather.temperature}°C</p>
            <p>Velocidade do Vento: {weather.windspeed} km/h</p>
            <p>Latitude: {weather.latitude}</p>
            <p>Longitude: {weather.longitude}</p>
          </div>
        </InfoCard>

        <InfoCard title="Insights">
          <div className="space-y-2 text-sm">
            <p><strong>Média:</strong> {insights.averageTemperature}°C</p>
            <p><strong>Tendência:</strong> {insights.trend}</p>
            <p><strong>Classificação:</strong> {insights.classification}</p>

            {insights.alerts.length > 0 && (
              <div className="text-red-500 mt-3">
                <strong>Alertas:</strong>
                <ul className="list-disc ml-5 mt-1">
                  {insights.alerts.map((alert: string, i: number) => (
                    <li key={i}>{alert}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-muted-foreground mt-3">
              {insights.summary}
            </p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
