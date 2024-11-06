import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Family from "src/family/models/family.model";

interface IAccountNumberCreateAttr {
    card_name: string;
    card_number: string;
    full_name: string;
}

@Table({ tableName: "account_number"})
export class AccountNumber extends Model<AccountNumber, IAccountNumberCreateAttr>{
    @ApiProperty({
        example: 1,
        description: "Account_number id"
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: "",
        description: "Account_number name"
    })
    @Column({
        type: DataType.STRING
    })
    card_name: string;

    @ApiProperty({
        example: "",
        description: "Account_number number"
    })
    @Column({
        type: DataType.STRING
    })
    card_number: string;

    @ApiProperty({
        example: "",
        description: "Account_number full_name"
    })
    @Column({
        type: DataType.STRING
    })
    full_name: string;

    @HasMany(() => Family)
    family: Family[];

}
export default AccountNumber;