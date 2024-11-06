import { Module } from '@nestjs/common';
import { OrganizatorService } from './organizator.service';
import { OrganizatorController } from './organizator.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Organizator from './models/organizator.model';

@Module({
  imports: [SequelizeModule.forFeature([Organizator])],
  controllers: [OrganizatorController],
  providers: [OrganizatorService],
})
export class OrganizatorModule {}
