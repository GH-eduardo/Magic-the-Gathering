import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { env } from 'process';
import { Public } from './auth/cross-cutting/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
