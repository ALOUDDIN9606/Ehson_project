import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Card from "src/cards/models/card.model";

interface IPaymentHistoryAttr {
    amount: number;
    cardId: number;
}

@Table({ tableName: "payment_history"})
export class PaymentHistory extends Model<PaymentHistory, IPaymentHistoryAttr>{
    @ApiProperty({
        example: 1,
        description: "Payment_History id"
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: 1000000,
        description: "Payment History amount"
    })
    @Column({
        type: DataType.INTEGER
    })
    amount: number;

    @ForeignKey(() => Card)
    @Column({
        type: DataType.INTEGER
    })
    cardId: number;
    @BelongsTo(() => Card)
    card: Card;
}
export default PaymentHistory;