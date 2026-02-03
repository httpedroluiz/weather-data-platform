import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || '123456';

    const existingUser = await this.usersService.findByEmail(email);

    if (!existingUser) {
      await this.usersService.create({
        name: 'Admin',
        email,
        password,
        role: 'admin',
      });

      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
}
