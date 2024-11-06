import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Wallet from "src/wallet/models/wallet.model";

interface IOrderDetailsAttr {
    transaction_date: Date;
    walletId: number;
}

@Table({ tableName: "order_details", timestamps: false})
export class OrderDetail extends Model<OrderDetail, IOrderDetailsAttr> {
    @ApiProperty({
        example: 1,
        description: "OrderDetail id"
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: "2024-11-15",
        description: "OrderDetail transaction_date"
    })
    @Column({
        type: DataType.DATE
    })
    transaction_date: Date;

    // @ApiProperty({
    //     example: "",
    //     description: "OrderDetail wallet_id (FK)"
    // })
    @ForeignKey(() => Wallet)
    @Column({
        type: DataType.INTEGER
    })
    walletId: number;
    @BelongsTo(() => Wallet)
    wallet: Wallet;
}
export default OrderDetail;