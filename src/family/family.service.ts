import { Injectable } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { InjectModel } from '@nestjs/sequelize';
import Family from './models/family.model';

@Injectable()
export class FamilyService {
  constructor(@InjectModel(Family) private familyModel: typeof Family){}
  create(createFamilyDto: CreateFamilyDto) {
    return this.familyModel.create(createFamilyDto);
  }

  findAll() {
    return this.familyModel.findAll({ include: {all: true} });
  }

  findOne(id: number) {
    return this.familyModel.findOne({ where: {id} });
  }

  async update(id: number, updateFamilyDto: UpdateFamilyDto) {
    const family = await this.familyModel.update(updateFamilyDto, {
      where: {id},
      returning: true
    })
    return family[1][0];
  }

  remove(id: number) {
    return this.familyModel.destroy({ where: {id} });
  }
}
