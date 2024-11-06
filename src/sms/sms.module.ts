import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sms } from 'twilio/lib/twiml/VoiceResponse';

@Module({
  imports: [],
  providers: [SmsService],
  exports: [SmsService]
})
export class SmsModule {}
