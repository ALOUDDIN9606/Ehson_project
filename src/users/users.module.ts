import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import  User  from './models/user.model';
import { Sms } from 'twilio/lib/twiml/VoiceResponse';
import { SmsService } from 'src/sms/sms.service';
import { JwtModule } from '@nestjs/jwt';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [SequelizeModule.forFeature([User]),
  JwtModule.register({}),
    SmsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

