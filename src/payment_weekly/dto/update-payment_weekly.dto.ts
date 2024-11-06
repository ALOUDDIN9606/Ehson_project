import { PartialType } from '@nestjs/swagger';
import { CreatePaymentWeeklyDto } from './create-payment_weekly.dto';

export class UpdatePaymentWeeklyDto extends PartialType(CreatePaymentWeeklyDto) {}
