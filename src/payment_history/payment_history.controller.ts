import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { CreatePaymentHistoryDto } from './dto/create-payment_history.dto';
import { UpdatePaymentHistoryDto } from './dto/update-payment_history.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaymentHistory from './models/payment_history.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("Payment-History")
@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

  // ✖️
  @ApiOperation({ summary: "Cterate Payment-history."})
  @ApiResponse({
    status: 200,
    description: "Create one payment-history.",
    type: PaymentHistory
  })
  @Post()
  create(@Body() createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return this.paymentHistoryService.create(createPaymentHistoryDto);
  }

  @ApiOperation({ summary: "Get all Payment-history."})
  @ApiResponse({
    status: 200,
    description: "List of  payment-history.",
    type: [PaymentHistory]
  })
  @Roles('ADMIN','SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.paymentHistoryService.findAll();
  }

  @ApiOperation({ summary: "Get by id Payment-history."})
  @ApiResponse({
    status: 200,
    description: "See one payment-history.",
    type: PaymentHistory
  })
  @Roles('USER', 'ADMIN','SUPERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentHistoryService.findOne(+id);
  }

  // ✖️
  @ApiOperation({ summary: "Update by id Payment-history."})
  @ApiResponse({
    status: 200,
    description: "Update one payment-history.",
    type: PaymentHistory
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentHistoryDto: UpdatePaymentHistoryDto) {
    return this.paymentHistoryService.update(+id, updatePaymentHistoryDto);
  }

  @ApiOperation({ summary: "Delete by id Payment-history."})
  @ApiResponse({
    status: 200,
    description: "Delete one payment-history.",
    type: PaymentHistory
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentHistoryService.remove(+id);
  }
}
