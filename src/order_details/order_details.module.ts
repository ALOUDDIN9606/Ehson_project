import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import OrderDetail from './models/order_detail.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderDetail])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
