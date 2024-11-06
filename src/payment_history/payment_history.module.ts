import { Module } from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { PaymentHistoryController } from './payment_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import PaymentHistory from './models/payment_history.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentHistory])],
  controllers: [PaymentHistoryController],
  providers: [PaymentHistoryService],
})
export class PaymentHistoryModule {}
