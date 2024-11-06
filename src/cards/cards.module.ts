import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Card from './models/card.model';

@Module({
  imports: [SequelizeModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService]
})
export class CardsModule {}
