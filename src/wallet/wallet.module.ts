import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Wallet from './models/wallet.model';
import Card from 'src/cards/models/card.model';
import OrderDetail from 'src/order_details/models/order_detail.model';

@Module({
  imports: [SequelizeModule.forFeature([Wallet, Card, OrderDetail])],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
