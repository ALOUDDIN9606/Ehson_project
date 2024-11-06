import { Module } from '@nestjs/common';
import { MyDonationsService } from './my_donations.service';
import { MyDonationsController } from './my_donations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import  MyDonation  from './models/my_donation.model';

@Module({
  imports: [SequelizeModule.forFeature([MyDonation])],
  controllers: [MyDonationsController],
  providers: [MyDonationsService],
  exports: [MyDonationsService]
})
export class MyDonationsModule {}
