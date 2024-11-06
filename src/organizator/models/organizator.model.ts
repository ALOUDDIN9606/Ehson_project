import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface IOrganizatorCreateAttr {
    org_name: string;
    phone_number: string;
    address: string;
    description: string;
    status: boolean;
}

@Table({ tableName: "organizator"})
export class Organizator extends Model<Organizator, IOrganizatorCreateAttr>{
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
        example: "Jome maschidi",
        description: "Organizator full_name."
    })
    @Column({
        type: DataType.STRING,
        unique: true
    })
    org_name: string;

    @ApiProperty({
        example: "+998997894512",
        description: "Organizator phone_number."
    })
    @Column({
        type: DataType.STRING,
    })
    phone_number: string;

    @ApiProperty({
        example: "Toshkent v",
        description: "Organizator address."
    })
    @Column({
        type: DataType.STRING,
        unique: true
    })
    address: string;

    @ApiProperty({
        example: "",
        description: "Organizator description."
    })
    @Column({
        type: DataType.STRING,
    })
    description: string;

    @ApiProperty({
        example: false,
        description: "Organizator status."
    })
    @Column({
        type: DataType.BOOLEAN,
    })
    status: boolean;

}
export default Organizator;
