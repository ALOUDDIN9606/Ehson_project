import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateOrderDetailDto {
    @IsDateString()
    transaction_date: Date;
    
    @IsNumber()
    walletId: number;
}
