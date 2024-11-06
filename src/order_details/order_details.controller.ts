import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import OrderDetail from './models/order_detail.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Order-Details")
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  // ✖️
  @ApiOperation({ summary: "Create Order-Details"})
  @ApiResponse({
    status: 200,
    description: "Create order-Details",
    type: OrderDetail
  })
  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @ApiOperation({ summary: "Get all Order-Details"})
  @ApiResponse({
    status: 200,
    description: "List of order-Details",
    type: [OrderDetail]
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @ApiOperation({ summary: "Get by id Order-Details"})
  @ApiResponse({
    status: 200,
    description: "See one order-Details",
    type: OrderDetail
  })
  @Roles('USER','ADMIN','SUPERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  // ✖️
  @ApiOperation({ summary: "Update by id Order-Details"})
  @ApiResponse({
    status: 200,
    description: "One order-Details",
    type: OrderDetail
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @ApiOperation({ summary: "Delete by id Order-Details"})
  @ApiResponse({
    status: 200,
    description: "One order-Details",
    type: OrderDetail
  })
  @Roles('USER','ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
