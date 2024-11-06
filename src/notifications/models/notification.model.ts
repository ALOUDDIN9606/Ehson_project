import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "src/users/models/user.model";

interface INotufucationCreateAttr {
    message: string;
    date_sent: Date;
    status: boolean;
    donationsId: number;
    userId: number;
}

@Table({ tableName: "notification"})
export class Notification extends Model<Notification, INotufucationCreateAttr> {
    @ApiProperty({
        example: 1,
        description: "Notification id"
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({
        example: "",
        description: "Notification message."
    })
    @Column({
        type: DataType.STRING
    })
    message: string;


    @ApiProperty({
        example: "2024-11-15",
        description: "Notification date-sent"
    })
    @Column({
        type: DataType.DATE
    })
    date_sent: Date;

    @ApiProperty({
        example: true,
        description: "Notification status"
    })
    @Column({
        type: DataType.BOOLEAN
    })
    status: boolean;

    // @ApiProperty({
    //     example: true,
    //     description: "Notification status"
    // })
    // @ForeignKey(() => )
    // @Column({
    //     type: DataType.INTEGER
    // })
    // donationsId: number;
    // @BelongsTo(() => )
    // donations: ;


    @ApiProperty({
        example: "",
        description: "User id (FK)"
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;
    @BelongsTo(() => User)
    user: User;
}
export default Notification;