import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentHistoryDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    cardId: number;
}
