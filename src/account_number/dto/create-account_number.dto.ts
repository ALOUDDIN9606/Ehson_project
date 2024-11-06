import { IsNumber, IsString } from "class-validator";

export class CreateAccountNumberDto {
    @IsString()
    card_name: string;

    @IsString()
    card_number: string;

    @IsString()
    full_name: string;
}
