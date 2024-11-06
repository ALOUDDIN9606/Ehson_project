import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateOrganizatorDto {
    @IsString()
    @IsNotEmpty()
    org_name: string;

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}
