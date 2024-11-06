import { Injectable } from '@nestjs/common';
import { CreatePaymentWeeklyDto } from './dto/create-payment_weekly.dto';
import { UpdatePaymentWeeklyDto } from './dto/update-payment_weekly.dto';
import { InjectModel } from '@nestjs/sequelize';
import PaymentWeekly from './models/payment_weekly.model';
import Wallet from 'src/wallet/models/wallet.model';

@Injectable()
export class PaymentWeeklyService {
  constructor(
    @InjectModel(PaymentWeekly) private paymentWeeklyModel: typeof PaymentWeekly,
    @InjectModel(Wallet) private walletModel: typeof Wallet
  ){}

  async processWeeklyPayments(): Promise<void> {
    const payments = await this.paymentWeeklyModel.findAll();

    for (const payment of payments) {
      const wallet = await this.walletModel.findOne(); 
      if (!wallet) {
        throw new Error('Wallet not found');
      }

      if (wallet.total_amount < payment.weekly_amount) {
        console.warn(`Insufficient funds in wallet for payment ${payment.id}`);
        continue; 
      }

      await this.walletModel.update(
        { total_amount: wallet.total_amount - payment.weekly_amount },
        { where: { id: wallet.id } },
      );

      await payment.save(); 
    }
  }

  create(createPaymentWeeklyDto: CreatePaymentWeeklyDto) {
    return this.paymentWeeklyModel.create(createPaymentWeeklyDto);
  }

  findAll() {
    return this.paymentWeeklyModel.findAll({ include: {all: true }});
  }

  findOne(id: number) {
    return this.paymentWeeklyModel.findOne({ where: {id} });
  }

  async update(id: number, updatePaymentWeeklyDto: UpdatePaymentWeeklyDto) {
    const paymentWeekly = await this.paymentWeeklyModel.update(updatePaymentWeeklyDto, {
      where: {id},
      returning: true
    })
    return paymentWeekly[1][0];
  }

  remove(id: number) {
    return this.paymentWeeklyModel.destroy({ where: {id} });
  }
}
