import { Module } from '@nestjs/common';
import { ImportationMessagingService } from './services/importation-messaging.service';

@Module({
    providers: [ImportationMessagingService],
    exports: [ImportationMessagingService]
})
export class ImportationsModule { }
