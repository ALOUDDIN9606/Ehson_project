import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/sequelize';
import Notification from './models/notification.model';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification) private notificationModel: typeof Notification,
  ){}

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  findAll() {
    return this.notificationModel.findAll({ include: {all: true}});
  }

  findOne(id: number) {
    return this.notificationModel.findOne({ where: {id} });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationModel.update(updateNotificationDto, {
      where: {id},
      returning: true
    })
    return notification[1][0];
  }

  remove(id: number) {
    return this.notificationModel.destroy({ where: {id} });
  }
}
