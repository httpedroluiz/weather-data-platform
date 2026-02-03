import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(data: Partial<User>) {
    const hash = await bcrypt.hash(data.password!, 10);
    return this.userModel.create({ ...data, password: hash });
  }

  findAll() {
    return this.userModel.find().select('-password');
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User not found');
    return { success: true };
  }
}
