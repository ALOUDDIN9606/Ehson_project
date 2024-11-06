import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    card_name: string;

    @IsString()
    @IsNotEmpty()
    card_number: string;

    @IsString()
    @IsNotEmpty()
    card_term: string;

    @IsNumber()
    @IsNotEmpty()
    main_card: number;

    @IsNumber()
    @IsNotEmpty()
    card_amount: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
