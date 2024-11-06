import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWalletDto {
    @IsNumber()
    total_amount: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    cardId: number;
}
