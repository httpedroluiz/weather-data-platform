import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherLog, WeatherLogSchema } from './weather.schema';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { WeatherInsightsService } from './insights/weather-insights.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WeatherLog.name, schema: WeatherLogSchema },
    ]),
  ],
  providers: [WeatherService, WeatherInsightsService],
  controllers: [WeatherController],
})
export class WeatherModule {}
