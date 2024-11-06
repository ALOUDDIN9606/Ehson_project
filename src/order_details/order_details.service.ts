import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import OrderDetail from './models/order_detail.model';

@Injectable()
export class OrderDetailsService {
  constructor(@InjectModel(OrderDetail) private orderDetailModel: typeof OrderDetail){}
  create(createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailModel.create(createOrderDetailDto);
  }

  findAll() {
    return this.orderDetailModel.findAll({ include: {all: true}});
  }

  findOne(id: number) {
    return this.orderDetailModel.findOne({ where: {id} });
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const order = await this.orderDetailModel.update(updateOrderDetailDto, {
      where: {id},
      returning: true
    })
    return order[1][0];
  }

  remove(id: number) {
    return this.orderDetailModel.destroy({ where: {id}});
  }
}
