import { Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Family from './models/family.model';

@Module({
  imports: [SequelizeModule.forFeature([Family])],
  controllers: [FamilyController],
  providers: [FamilyService],
})
export class FamilyModule {}
