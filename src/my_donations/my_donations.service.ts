import { Injectable } from '@nestjs/common';
import { CreateMyDonationDto } from './dto/create-my_donation.dto';
import { UpdateMyDonationDto } from './dto/update-my_donation.dto';
import { InjectModel } from '@nestjs/sequelize';
import MyDonation from './models/my_donation.model';
import { where } from 'sequelize';

@Injectable()
export class MyDonationsService {
  constructor(@InjectModel(MyDonation) private myDonationModel: typeof MyDonation){}
  create(createMyDonationDto: CreateMyDonationDto) {
    return this.myDonationModel.create(createMyDonationDto);
  }

  findAll() {
    return this.myDonationModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.myDonationModel.findOne({ where: {id}});
  }

  async update(id: number, updateMyDonationDto: UpdateMyDonationDto) {
    const mydonation = await this.myDonationModel.update(updateMyDonationDto, {
      where: {id},
      returning: true 
    })
    return mydonation[1][0];
  }

  remove(id: number) {
    return this.myDonationModel.destroy({ where: {id} });
  }
}
