import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "src/users/models/user.model";

interface IMy_DonationsAttr {
    amount: number;
    status: boolean;
    userId: number;
}

@Table({ tableName: "my_donations"})
export class MyDonation extends Model<MyDonation, IMy_DonationsAttr> {
    @ApiProperty({
        example: 1,
        description: "Order id."
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({
        example: 100000,
        description: "My donation amount."
    })
    @Column({
        type: DataType.DECIMAL,
    })
    amount: number;

    @ApiProperty({
        example: "true",
        description: "My donaion status."
    })
    @Column({
        type: DataType.BOOLEAN,
    })
    status: boolean;


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
export default MyDonation;
