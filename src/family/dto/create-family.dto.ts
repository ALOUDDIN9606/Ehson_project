import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFamilyDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsDateString()
    @IsNotEmpty()
    birth_of_date: Date;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    donation_amount: number;

    @IsString()
    diaognosis: string;

    @IsString()
    @IsNotEmpty()
    fond_name: string;

    @IsString()
    @IsNotEmpty()
    medical_institution: string;

    @IsNumber()
    total_amount: number;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @IsNumber()
    @IsNotEmpty()
    accont_numberId: number;
}
