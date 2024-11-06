import { PartialType } from '@nestjs/swagger';
import { CreateMyDonationDto } from './create-my_donation.dto';

export class UpdateMyDonationDto extends PartialType(CreateMyDonationDto) {}
