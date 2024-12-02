import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('lotes.importacao')
  async accumulate(batchId: string): Promise<void> {
    await this.appService.validateBatch(batchId);
  }
}
