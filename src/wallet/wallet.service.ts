import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import Wallet from './models/wallet.model';
import Card from 'src/cards/models/card.model';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';
import OrderDetail from 'src/order_details/models/order_detail.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet) private walletModel: typeof Wallet,
    @InjectModel(Card) private cardModel: typeof Card,
    @InjectModel(OrderDetail) private orderDetailsService: OrderDetailsService
  ){}

  create(createWalletDto: CreateWalletDto) {
    return this.walletModel.create(createWalletDto);
  }

  async transferToWallet(cardId: number, walletAmount: number): Promise<void> {
    const card = await this.cardModel.findByPk(cardId);
    if (!card) {
      throw new Error('Card not found');
    }
  
    if (card.card_amount < walletAmount) {
      throw new Error('Insufficient card amount');
    }
  
    let wallet = await this.walletModel.findOne();
    if (!wallet) {
        console.log("Xato");
        
    }
  
    // Raqamlarni to'g'ri formatda qo'shish
    const newCardAmount = card.card_amount - walletAmount;
    const newTotalAmount = wallet.total_amount + walletAmount;
  
    await this.cardModel.update(
      { card_amount: newCardAmount },
      { where: { id: cardId } },
    );
  
    await this.walletModel.update(
      { total_amount: newTotalAmount },
      { where: { id: wallet.id } },
    );

    const orderDetailsDto: CreateOrderDetailDto = {
      transaction_date: new Date(), // Hozirgi vaqt
      walletId: wallet.id,
    };

    await this.orderDetailsService.create(orderDetailsDto);
  }

  findAll() {
    return this.walletModel.findAll({ include: {all: true} });
  }

  findOne(id: number) {
    return this.walletModel.findOne({ where: {id} });
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.walletModel.update(updateWalletDto, {
      where: {id},
      returning: true
    })
    return wallet[1][0];
  }

  remove(id: number) {
    return this.walletModel.destroy({where: {id}});
  }
}
