import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherLog } from './weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherLog.name)
    private weatherModel: Model<WeatherLog>,
  ) {}

  async create(data: Partial<WeatherLog>) {
    return this.weatherModel.create(data);
  }

  async findAll() {
    return this.weatherModel.find().sort({ createdAt: -1 }).limit(100);
  }

  async findLatest() {
    return this.weatherModel.findOne().sort({ createdAt: -1 });
  }

  findForExport() {
    return this.weatherModel.find().sort({ createdAt: 1 });
  }
}
