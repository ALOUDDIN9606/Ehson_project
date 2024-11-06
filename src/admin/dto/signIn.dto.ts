import { isEmail, IsNotEmpty, IsString } from "class-validator";
import { IsEmail } from "sequelize-typescript";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}