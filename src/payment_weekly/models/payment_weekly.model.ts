import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "src/users/models/user.model";

interface IPaymentWeeklyAttr {
    payment_date: Date;
    weekly_amount: number;
    status: boolean;
    userId: number;
}

@Table({ tableName: "payment-weekly"})
export class PaymentWeekly extends Model<PaymentWeekly, IPaymentWeeklyAttr>{
    @ApiProperty({
        example: 1,
        description: "Payment-weekly id."
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({
        example: 100000,
        description: "Payment-weekly amount."
    })
    @Column({
        type: DataType.DECIMAL,
    })
    weekly_amount: number;  

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
}

export default PaymentWeekly;

