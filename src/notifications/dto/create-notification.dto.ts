import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    message: string;

    @IsDateString()
    date_sent: Date;

    @IsBoolean()
    status: boolean;

    @IsNumber()
    donationsId: number;

    @IsNumber()
    userId: number;
}
