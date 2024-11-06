import * as uuid from "uuid";
import { BadRequestException, Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import User from './models/user.model';
import {hash} from 'bcrypt';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly smsService: SmsService
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const condidate = await this.userModel.findOne({
        where: { email: createUserDto.email },
      });

      if (condidate) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }

      if (createUserDto.password !== createUserDto.confirm_password) {
        throw new BadRequestException('Parrolls are not suitable.');
      }

      const hashed_password = await hash(createUserDto.password, 7);
      const newUser = await this.userModel.create({
        ...createUserDto,
        hashed_password,
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.userModel.findAll({include: {all:true}});
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password && updateUserDto.confirm_password) {
      if (updateUserDto.password !== updateUserDto.confirm_password) {
        throw new BadRequestException('Parollar mos emas');
      }
      const hashed_password = await hash(updateUserDto.password, 7);
      const user = await this.userModel.update(
        { ...updateUserDto },
        { where: { id }, returning: true },
      );
      return user[1][0];
    }
    const updatedUser = await this.userModel.update(
      { ...updateUserDto },
      { where: { id }, returning: true },
    );
    return updatedUser[1][0];
  }

  remove(id: number) {
    return this.userModel.destroy({where: {id}});
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.userModel.update(
      { hashed_refresh_token },
      { where: { id }, returning: true },
    );
  }

  async updateUserByEmail(email: string) {
    const user = await this.userModel.update(
      { is_active: true },
      { where: { email }, returning: true },
    );
    return user[1][0]
  }
}
