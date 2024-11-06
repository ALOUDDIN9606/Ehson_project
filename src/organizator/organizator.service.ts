import { Injectable } from '@nestjs/common';
import { CreateOrganizatorDto } from './dto/create-organizator.dto';
import { UpdateOrganizatorDto } from './dto/update-organizator.dto';
import { InjectModel } from '@nestjs/sequelize';
import Organizator from './models/organizator.model';

@Injectable()
export class OrganizatorService {
  constructor(@InjectModel(Organizator) private orgModel: typeof Organizator){}
  create(createOrganizatorDto: CreateOrganizatorDto) {
    return this.orgModel.create(createOrganizatorDto);
  }

  findAll() {
    return this.orgModel.findAll({ include: {all: true}});
  }

  findOne(id: number) {
    return this.orgModel.findOne({ where: {id} });
  }

  async update(id: number, updateOrganizatorDto: UpdateOrganizatorDto) {
    const org = await this.orgModel.update(updateOrganizatorDto, {
      where: {id},
      returning: true
    })
    return org[1][0];
  }

  remove(id: number) {
    return this.orgModel.destroy({ where: {id} });
  }
}
