export interface Weather {
  _id: string;

  temperature: number;
  temperatureMin: number;
  temperatureMax: number;

  windspeed: number;
  humidity: number;
  cloudCover: number;

  weatherCode: number;

  city: string;

  time: string;
  latitude: string;
  longitude: string;

  createdAt: string;
  updatedAt: string;
}