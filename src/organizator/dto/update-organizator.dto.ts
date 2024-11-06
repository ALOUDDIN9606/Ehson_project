import { PartialType } from '@nestjs/swagger';
import { CreateOrganizatorDto } from './create-organizator.dto';

export class UpdateOrganizatorDto extends PartialType(CreateOrganizatorDto) {}
