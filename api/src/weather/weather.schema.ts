import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WeatherLog extends Document {
  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  windspeed: number;

  @Prop({ required: true })
  weatherCode: number;

  @Prop({ required: true })
  time: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  humidity: number;

  @Prop()
  cloudCover: number;

  @Prop()
  temperatureMax: number;

  @Prop()
  temperatureMin: number;

  @Prop()
  city: string;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog);
