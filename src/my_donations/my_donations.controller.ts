import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { MyDonationsService } from './my_donations.service';
import { CreateMyDonationDto } from './dto/create-my_donation.dto';
import { UpdateMyDonationDto } from './dto/update-my_donation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import MyDonation from './models/my_donation.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("My_donations")
@Controller('my-donations')
export class MyDonationsController {
  constructor(private readonly myDonationsService: MyDonationsService) {}

  @ApiOperation({summary: "Create donayion."})
  @Roles('USER','ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createMyDonationDto: CreateMyDonationDto) {
    return this.myDonationsService.create(createMyDonationDto);
  }

  @ApiOperation({ summary: "Gey all Donations."})
  @ApiResponse({
    status: 200,
    description: "List of Donation",
    type: [MyDonation]
  })
  @Roles('ADMIN','SUPERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.myDonationsService.findAll();
  }

  @ApiOperation({ summary: "Gey by id Donation."})
  @ApiResponse({
    status: 200,
    description: "One Donation",
    type: MyDonation
  })
  @Roles('SUPERADMIN','ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myDonationsService.findOne(+id);
  }

  @ApiOperation({ summary: "Updated by id Donation."})
  @ApiResponse({
    status: 200,
    description: "One Donation updated",
    type: MyDonation
  })
  @Roles('USER','ADMIN','SUPERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyDonationDto: UpdateMyDonationDto) {
    return this.myDonationsService.update(+id, updateMyDonationDto);
  }

  @ApiOperation({ summary: "Deleted by id Donation."})
  @ApiResponse({
    status: 200,
    description: "One Donation deleted",
    type: MyDonation
  })
  @Roles('USER','ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myDonationsService.remove(+id);
  }
}
