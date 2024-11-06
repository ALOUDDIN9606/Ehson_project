import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { PaymentWeeklyService } from './payment_weekly.service';
import { CreatePaymentWeeklyDto } from './dto/create-payment_weekly.dto';
import { UpdatePaymentWeeklyDto } from './dto/update-payment_weekly.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaymentWeekly from './models/payment_weekly.model';
import { Cron } from '@nestjs/schedule';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("Payment-Weekly")
@Controller('payment-weekly')
export class PaymentWeeklyController {
  constructor(private readonly paymentWeeklyService: PaymentWeeklyService) {}

  @Cron('0 0 * * 5')
  async handleCron() {
    await this.paymentWeeklyService.processWeeklyPayments();
  }

  @ApiOperation({ summary: "Create payment-weekly"})
  @ApiResponse({
    status: 200,
    description: "Create payment.",
    type: PaymentWeekly
  })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createPaymentWeeklyDto: CreatePaymentWeeklyDto) {
    return this.paymentWeeklyService.create(createPaymentWeeklyDto);
  }

  @ApiOperation({ summary: "Get all payment-weekly"})
  @ApiResponse({
    status: 200,
    description: "List of payment-weekly",
    type: [PaymentWeekly]
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.paymentWeeklyService.findAll();
  }

  @ApiOperation({ summary: "Get by id payment-weekly"})
  @ApiResponse({
    status: 200,
    description: "One of payment-weekly",
    type: PaymentWeekly
  })
  @Roles('USER','ADMIN','SUPERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentWeeklyService.findOne(+id);
  }

  @ApiOperation({ summary: "Update by id payment-weekly"})
  @ApiResponse({
    status: 200,
    description: "updated one payment-weekly",
    type: PaymentWeekly
  })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentWeeklyDto: UpdatePaymentWeeklyDto) {
    return this.paymentWeeklyService.update(+id, updatePaymentWeeklyDto);
  }

  @ApiOperation({ summary: "Deleted by id payment-weekly"})
  @ApiResponse({
    status: 200,
    description: "Deleted one payment-weekly",
    type: PaymentWeekly
  })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentWeeklyService.remove(+id);
  }
}
