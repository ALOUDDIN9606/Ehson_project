import { Module } from '@nestjs/common';
import { AccountNumberService } from './account_number.service';
import { AccountNumberController } from './account_number.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import AccountNumber from './models/account_number.model';

@Module({
  imports: [SequelizeModule.forFeature([AccountNumber])],
  controllers: [AccountNumberController],
  providers: [AccountNumberService],
})
export class AccountNumberModule {}
