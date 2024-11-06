import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendOtpAgainDto {
  @IsEmail()
  email: string;
}
