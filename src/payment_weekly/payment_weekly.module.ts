import { Module } from '@nestjs/common';
import { PaymentWeeklyService } from './payment_weekly.service';
import { PaymentWeeklyController } from './payment_weekly.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import PaymentWeekly from './models/payment_weekly.model';
import Wallet from 'src/wallet/models/wallet.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentWeekly, Wallet])],
  controllers: [PaymentWeeklyController],
  providers: [PaymentWeeklyService],
})
export class PaymentWeeklyModule {}
