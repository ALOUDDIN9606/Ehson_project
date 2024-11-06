import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Column, DataType } from 'sequelize-typescript';

export class CreateAdminDto {
  @ApiProperty({
    example: 'Anvar',
    description: "Admin's name",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: '+998991002030',
    description: "Admin's email",
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: "Admin's email",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'anvar111',
    description: "Admin's password",
  })
  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty({
    example: 'anvar111',
    description: "Admin's confirm password",
  })
  @IsString()
  @MinLength(5)
  confirm_password: string;

  @ApiProperty({
    example: "",
    description: "Admin's status (active/inactive)",
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty({
    example: "",
    description: "Admin's role (creator/non-creator)",
  })
  @IsBoolean()
  @IsNotEmpty()
  is_creator: boolean;

  @ApiProperty({
      example: "",
      description: "User activation_link."
  })
  @Column({
      type: DataType.STRING,
  })
  activation_link: string;
}
