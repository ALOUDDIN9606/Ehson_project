import { IsBoolean, IsNumber } from "class-validator";

export class CreateMyDonationDto {
    @IsNumber()
    amount: number;

    @IsBoolean()
    status: boolean;

    @IsNumber()
    userId: number;
}
