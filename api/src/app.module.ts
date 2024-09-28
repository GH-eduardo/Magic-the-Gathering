import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DecksModule } from './decks/decks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { env } from 'process';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true, envFilePath: '.env.development' }
    ),
    MongooseModule.forRoot(
      `mongodb://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/`
    ),
    CacheModule.register({ isGlobal: true }),
    DecksModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
