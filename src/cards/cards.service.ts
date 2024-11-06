import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import Card from './models/card.model';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private cardModel: typeof Card){}
  create(createCardDto: CreateCardDto) {
    return this.cardModel.create(createCardDto);
  }

  findAll() {
    return this.cardModel.findAll({ include: {all: true}});
  }

  findOne(id: number) {
    return this.cardModel.findOne({ where: {id}});
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.cardModel.update(updateCardDto, {
      where: {id},
      returning: true
    })
    return card[1][0];
  }

  remove(id: number) {
    return this.cardModel.destroy({ where: {id}});
  }
}
