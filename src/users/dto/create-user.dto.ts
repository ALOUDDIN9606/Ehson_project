import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    birth_of_date: Date;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    registation_date: Date;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirm_password: string;

    @IsBoolean()
    is_active: boolean;
}
