import { Injectable } from '@nestjs/common';
import { CreatePaymentHistoryDto } from './dto/create-payment_history.dto';
import { UpdatePaymentHistoryDto } from './dto/update-payment_history.dto';
import { InjectModel } from '@nestjs/sequelize';
import PaymentHistory from './models/payment_history.model';

@Injectable()
export class PaymentHistoryService {
  constructor(@InjectModel(PaymentHistory) private paymentHistoryModel: typeof PaymentHistory){}
  create(createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return this.paymentHistoryModel.create(createPaymentHistoryDto);
  }

  findAll() {
    return this.paymentHistoryModel.findAll({ include: {all: true}});
  }

  findOne(id: number) {
    return this.paymentHistoryModel.findOne({ where: {id} });
  }

  async update(id: number, updatePaymentHistoryDto: UpdatePaymentHistoryDto) {
    const paymentHistory = await this.paymentHistoryModel.update(updatePaymentHistoryDto,{
      where: {id},
      returning: true
    })
    return paymentHistory[1][0];
  }

  remove(id: number) {
    return this.paymentHistoryModel.destroy({ where: {id} });
  }
}
