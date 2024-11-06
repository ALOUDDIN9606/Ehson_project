import { PartialType } from '@nestjs/swagger';
import { CreateAccountNumberDto } from './create-account_number.dto';

export class UpdateAccountNumberDto extends PartialType(CreateAccountNumberDto) {}
