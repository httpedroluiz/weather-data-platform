import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Parser } from 'json2csv';
import * as ExcelJS from 'exceljs';
import type { Response } from 'express';
import { WeatherInsightsService } from './insights/weather-insights.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private weatherService: WeatherService,
    private insightsService: WeatherInsightsService,
  ) {}

  @Post('logs')
  create(@Body() body: any) {
    return this.weatherService.create({
      temperature: body.temperature,
      windspeed: body.windspeed,
      weatherCode: body.weatherCode,
      humidity: body.humidity,
      cloudCover: body.cloudCover,
      temperatureMax: body.temperatureMax,
      temperatureMin: body.temperatureMin,
      city: body.city,
      time: body.time,
      latitude: body.latitude,
      longitude: body.longitude
    });
  }

  @Get()
  async findLatest() {
    const data = await this.weatherService.findLatest();

    if (!data) {
      return { message: 'No weather data found' };
    }

    return data;
  }

  @Get('logs')
  findAll() {
    return this.weatherService.findAll();
  }

  @Get('insights')
  async insights() {
    const logs = await this.weatherService.findForExport();
    return this.insightsService.generate(logs);
  }

  @Get('export.csv')
  async exportCsv(@Res() res: Response) {
    const data = await this.weatherService.findForExport();

    const parser = new Parser({
      fields: [
        'temperature',
        'temperatureMin',
        'temperatureMax',
        'humidity',
        'cloudCover',
        'windspeed',
        'weatherCode',
        'city',
        'time',
        'latitude',
        'longitude',
        'createdAt',
      ],
    });

    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('weather.csv');
    res.send(csv);
  }

  @Get('export.xlsx')
  async exportXlsx(@Res() res: Response) {
    const data = await this.weatherService.findForExport();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Weather');

    sheet.columns = [
      { header: 'Temperature', key: 'temperature' },
      { header: 'Temp Min', key: 'temperatureMin' },
      { header: 'Temp Max', key: 'temperatureMax' },
      { header: 'Humidity', key: 'humidity' },
      { header: 'Cloud Cover', key: 'cloudCover' },
      { header: 'Windspeed', key: 'windspeed' },
      { header: 'Weather Code', key: 'weatherCode' },
      { header: 'City', key: 'city' },
      { header: 'Time', key: 'time' },
      { header: 'Latitude', key: 'latitude' },
      { header: 'Longitude', key: 'longitude' },
      { header: 'Created At', key: 'createdAt' },
    ];

    data.forEach((item) => {
      sheet.addRow(item.toObject());
    });

    res.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.attachment('weather.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
