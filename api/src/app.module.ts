import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),

    HealthModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'production') return;

    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || '123456';

    const adminExists = await this.usersService.findByEmail(email);

    if (!adminExists) {
      await this.usersService.create({
        name: 'Admin',
        email,
        password,
        role: 'admin',
      });

      console.log('✔ Admin user created on startup');
    }
  }
}
