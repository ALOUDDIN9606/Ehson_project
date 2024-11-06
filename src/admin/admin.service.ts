import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SignInDto } from './dto/signIn.dto';
import * as uuid from "uuid";
import { Tokens } from './dto/tokens.type';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
  ) {}

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id }, returning: true },
    );
  }

  async findByPassword(password: string) {
    return this.adminModel.findOne({ where: { password } });
  }

  async create(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminModel.findOne({
      where: { password: createAdminDto.password },
    });

    if (candidate) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Parrollar mos emas');
    }

    const hashed_password = await hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    return newAdmin;
  }

  findAll() {
    return this.adminModel.findAll({include: {all:true}});
  }

  findOne(id: number) {
    return this.adminModel.findOne({where: {id}});
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminModel.update(updateAdminDto, {
      where: {id},
      returning: true
    })
    return admin[1][0];
  }

  remove(id: number) {
    return this.adminModel.destroy({where: {id}});
  }
}
