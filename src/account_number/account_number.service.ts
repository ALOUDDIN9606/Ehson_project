import { Injectable } from '@nestjs/common';
import { CreateAccountNumberDto } from './dto/create-account_number.dto';
import { UpdateAccountNumberDto } from './dto/update-account_number.dto';
import { InjectModel } from '@nestjs/sequelize';
import AccountNumber from './models/account_number.model';

@Injectable()
export class AccountNumberService {
  constructor(@InjectModel(AccountNumber) private accountNumberModel: typeof AccountNumber){}
  create(createAccountNumberDto: CreateAccountNumberDto) {
    return this.accountNumberModel.create(createAccountNumberDto);
  }

  findAll() {
    return this.accountNumberModel.findAll({ include: {all: true}});
  }

  findOne(id: number) {
    return this.accountNumberModel.findOne({ where: {id} });
  }

  async update(id: number, updateAccountNumberDto: UpdateAccountNumberDto) {
    const accountNumber = await this.accountNumberModel.update(updateAccountNumberDto, {
      where: {id},
      returning: true
    })
    return accountNumber[1][0];
  }

  remove(id: number) {
    return this.accountNumberModel.destroy({ where: {id} });
  }
}
