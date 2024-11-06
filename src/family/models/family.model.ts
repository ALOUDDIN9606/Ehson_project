import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import AccountNumber from "src/account_number/models/account_number.model";

interface IFamilyCreateAttr {
    full_name: string;
    birth_of_date: Date;
    address: string;
    donation_amount: number;
    diaognosis: string;
    fond_name: string;
    medical_institution: string;
    total_amount: number;
    status: boolean;
    accont_numberId: number;
}

@Table({ tableName: "family", timestamps: false})
export class Family extends Model<Family, IFamilyCreateAttr>{
    @ApiProperty({
        example: 1,
        description: "Family id."
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({
        example: "Abror Shakirov",
        description: "Family full_name."
    })
    @Column({
        type: DataType.STRING,
    })
    full_name: string;


    @ApiProperty({
        example: "2024-11-12",
        description: "Family birth_of_date."
    })
    @Column({
        type: DataType.DATE,
    })
    birth_of_date: Date;


    @ApiProperty({
        example: "Toshkent sh",
        description: "Family address."
    })
    @Column({
        type: DataType.STRING,
    })
    address: string;


    @ApiProperty({
        example: 10000000,
        description: "Family donation_amount."
    })
    @Column({
        type: DataType.INTEGER,
    })
    donation_amount: number;


    @ApiProperty({
        example: "",
        description: "Family diaognosis."
    })
    @Column({
        type: DataType.STRING,
    })
    diaognosis: string;


    @ApiProperty({
        example: "",
        description: "Family fond_name."
    })
    @Column({
        type: DataType.STRING,
    })
    fond_name: string;

    @ApiProperty({
        example: "",
        description: "Family medical_institution."
    })
    @Column({
        type: DataType.STRING,
    })
    medical_institution: string;

    @ApiProperty({
        example: "",
        description: "Account_number number"
    })
    @Column({
        type: DataType.INTEGER
    })
    total_amount: number;

    @ApiProperty({
        example: true,
        description: "Family status."
    })
    @Column({
        type: DataType.BOOLEAN,
    })
    status: boolean;

    @ForeignKey(() => AccountNumber)
    @Column({
        type: DataType.INTEGER
    })
    accont_numberId: number;
    @BelongsTo(() => AccountNumber)
    account_number: AccountNumber;
}
export default Family;