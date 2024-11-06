import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Card from "src/cards/models/card.model";
import OrderDetail from "src/order_details/models/order_detail.model";
import User from "src/users/models/user.model";

interface IWalletCteateAttr {
    userId: number;
    cardId: number;
    total_amount: number;
}

@Table({ tableName: "wallet"})
export class Wallet extends Model<Wallet,  IWalletCteateAttr>{
    @ApiProperty({
        example: 1,
        description: "Wallet id."
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: 1000000,
        description: "Wallet amount."
    })
    @Column({
        type: DataType.INTEGER,
    })
    total_amount: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Card)
    @Column({
        type: DataType.INTEGER
    })
    cardId: number;
    @BelongsTo(() => Card)
    card: Card;

    @HasMany(() => OrderDetail)
    order_detail: OrderDetail[];
}
export default Wallet;