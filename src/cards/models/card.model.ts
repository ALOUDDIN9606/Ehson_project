import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import PaymentHistory from "src/payment_history/models/payment_history.model";
import User from "src/users/models/user.model";
import Wallet from "src/wallet/models/wallet.model";

interface ICardCreateAttr {
    card_name: string;
    card_number: string;
    card_term: string;
    main_card: number;
    card_amount: number;
    userId: number;
}

@Table({ tableName: "card", timestamps: false})
export class Card extends Model<Card, ICardCreateAttr>{
    @ApiProperty({
        example: 1,
        description: "Card id"
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: "TuronBank",
        description: "Card name"
    })
    @Column({
        type: DataType.STRING
    })
    card_name: string;

    @ApiProperty({
        example: "1111 2222 3333 4444",
        description: "Card number"
    })
    @Column({
        type: DataType.STRING
    })
    card_number: string;

    @ApiProperty({
        example: "10/24",
        description: "Card term"
    })
    @Column({
        type: DataType.STRING
    })
    card_term: string;

    @ApiProperty({
        example: 1,
        description: "Card name"
    })
    @Column({
        type: DataType.INTEGER
    })
    main_card: number;

    @ApiProperty({
        example: 1,
        description: "Card name"
    })
    @Column({
        type: DataType.INTEGER
    })
    card_amount: number;

    @ApiProperty({
        example: 1,
        description: "User id  (FK)."
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;
    @BelongsTo(() => User)
    user: User;

    @HasMany(() => PaymentHistory)
    payment_history: PaymentHistory[];
}
export default Card;
