import { Controller, Post, Body, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post('logs')
  create(@Body() body: any) {
    return this.weatherService.create({
      temperature: body.temperature,
      windspeed: body.windspeed,
      weatherCode: body.weathercode,
      time: body.time,
      latitude: body.latitude,
      longitude: body.longitude,
    });
  }

  @Get('logs')
  findAll() {
    return this.weatherService.findAll();
  }
}
