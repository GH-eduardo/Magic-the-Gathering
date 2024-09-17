import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { env } from 'process';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email });        
    }

    async create(email: string, username: string, password: string): Promise<any> {
        const existsUser = await this.findByEmail(email);
        if (existsUser) {
            throw new ConflictException();
        }

        const hash = await bcrypt.hash(password, env.BCRYPT_ROUNDS);
        
        const createdUser = new this.userModel({ email, password: hash, username });
        return createdUser.save();
    }
}
