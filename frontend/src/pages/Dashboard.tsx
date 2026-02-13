import { useEffect, useState } from "react";
import { getWeather, getInsights } from "../api/weather";

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
    return <div className="p-8">Carregando...</div>;
  }

  if (!weather || !insights) {
    return (
      <div className="p-8 text-red-400">
        Dados indisponíveis.
      </div>
    );
  }


  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold">
        Weather Dashboard
      </h2>

      {/* Weather atual */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl mb-2">Clima Atual</h3>

        <p>Temperatura: {weather.temperature}°C</p>
        <p>Velocidade do Vento: {weather.windspeed} km/h</p>
        <p>Latitude: {weather.latitude}</p>
        <p>Longitude: {weather.longitude}</p>
      </div>


      {/* Insights */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl mb-2">Insights</h3>
        <p>Média: {insights.averageTemperature}°C</p>
        <p>Tendência: {insights.trend}</p>
        <p>Classificação: {insights.classification}</p>

        {insights.alerts && insights.alerts.length > 0 && (
          <div className="mt-3 text-red-400">
            Alertas:
            <ul className="list-disc ml-6">
              {insights.alerts.map((alert: string, index: number) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-4 text-gray-400">
          {insights.summary}
        </p>
      </div>
    </div>
  );
}
