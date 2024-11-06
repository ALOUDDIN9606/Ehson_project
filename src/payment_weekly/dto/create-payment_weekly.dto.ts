import { IsBoolean, IsDate, isDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentWeeklyDto {
    @IsNumber()
    @IsNotEmpty()
    weekly_amount: number;

    @IsNumber()
    userId: number;
}
