import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import MyDonation from "src/my_donations/models/my_donation.model";
import Notification from "src/notifications/models/notification.model";
import PaymentWeekly from "src/payment_weekly/models/payment_weekly.model";
import Wallet from "src/wallet/models/wallet.model";

interface IUserCteationAttr {
    first_name: string;
    last_name: string;
    birth_of_date: Date;
    phone_number: string;
    email: string;
    address: string;
    password: string;
    registation_date: Date;
    hashed_password: string;
    is_active: boolean;
}

@Table({ tableName: "user", timestamps: false})
export class User extends Model<User, IUserCteationAttr> {
    @ApiProperty({
        example: 1,
        description: "User id."
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: "Anvar",
        description: "User name."
    })
    @Column({
        type: DataType.STRING,
    })
    first_name: string;

    @ApiProperty({
        example: "Salimov",
        description: "User name."
    })
    @Column({
        type: DataType.STRING,
    })
    last_name: string;

    @ApiProperty({
        example: "03.06.1996",
        description: "User name."
    })
    @Column({
        type: DataType.DATE,
    })
    birth_of_date: Date;    
    
    @ApiProperty({
        example: "+998991112233",
        description: "User phone."
    })
    @Column({
        type: DataType.STRING
    })
    phone_number: string;

    @ApiProperty({
        example: "salim111@gmail.com",
        description: "User email."
    })
    @Column({
        type: DataType.STRING,
    })
    email: string;

    @ApiProperty({
        example: "Toshkent v, Chilonzor t",
        description: "User address."
    })
    @Column({
        type: DataType.STRING
    })
    address: string;

    @ApiProperty({
        example: "02.11.2024",
        description: "User registation_date."
    })
    @Column({
        type: DataType.DATE
    })
    registation_date: Date;

    @ApiProperty({
        example: "",
        description: ""
    })
    @Column({
        type: DataType.STRING
    })
    password: string;

    @ApiProperty({
        example: "1234567",
        description: "User password."
    })
    @Column({
        type: DataType.STRING
    })
    hashed_password: string;

    @ApiProperty({
        example: "",
        description: "User hashed_refresh_token."
    })
    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @ApiProperty({
        example: "",
        description: "User activation_link."
    })
    @Column({
        type: DataType.STRING,
    })
    activation_link: string;

    @ApiProperty({
        example: "",
        description: "User is_active"
    })
    @Column({
        type: DataType.BOOLEAN,
    })
    is_active: boolean;


    @HasMany(() => MyDonation)
    mydonation: MyDonation[];

    @HasMany(() => PaymentWeekly)
    payment_weekly: PaymentWeekly[];

    @HasMany(() => Wallet)
    wallet: Wallet[];

    @HasMany(() => Notification)
    notification: Notification[];
}

export default User;