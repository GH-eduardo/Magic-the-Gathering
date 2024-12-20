import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notificacoes')
  accumulate(data: any): void {
    this.appService.onModuleInit();
  }

  @MessagePattern('notificacoes')
  accumulate(data: any): void {
    console.log(data)
  }
}
