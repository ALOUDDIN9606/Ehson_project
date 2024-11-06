import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/users/models/user.model';
import { MailModule } from 'src/mail/mail.module';
import { AdminModule } from 'src/admin/admin.module';
import { Otp } from './models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Otp]),
  MailModule, UsersModule, AdminModule,
    JwtModule.register({
      global: true,
  })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
