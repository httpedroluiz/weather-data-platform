import { Injectable } from '@nestjs/common';
import { WeatherLog } from '../weather.schema';

@Injectable()
export class WeatherInsightsService {
  generate(logs: WeatherLog[]) {
    if (!logs.length) {
      return {
        averageTemperature: 0,
        trend: 'estável',
        classification: 'indefinido',
        alerts: [],
        summary: 'Sem dados suficientes.',
      };
    }

    const temps = logs.map((l) => l.temperature);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

    const trend = temps.length >= 2 ? temps[temps.length - 1] - temps[0] : 0;

    let classification = 'agradável';
    if (avgTemp >= 30) classification = 'quente';
    if (avgTemp <= 15) classification = 'frio';

    const alerts: string[] = [];
    if (avgTemp >= 35) alerts.push('Calor extremo');
    if (avgTemp <= 5) alerts.push('Frio intenso');

    return {
      averageTemperature: Number(avgTemp.toFixed(2)),
      trend: trend > 0 ? 'subindo' : trend < 0 ? 'caindo' : 'estável',
      classification,
      alerts,
      summary: `Nos últimos ${logs.length} registros, a temperatura média foi de ${avgTemp.toFixed(
        1,
      )}°C, com tendência ${trend > 0 ? 'de alta' : trend < 0 ? 'de queda' : 'estável'}.`,
    };
  }
}
