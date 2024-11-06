import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Card from './models/card.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Card")
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: "Create Card"})
  @Roles('USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @ApiOperation({ summary: "Get all Card."})
  @ApiResponse({
    status: 200,
    description: "List of card",
    type: [Card]
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @ApiOperation({ summary: "Get by id Card."})
  @ApiResponse({
    status: 200,
    description: "One card",
    type: Card
  })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @ApiOperation({ summary: "Updated by id Card."})
  @ApiResponse({
    status: 200,
    description: "One card updated",
    type: Card
  })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @ApiOperation({ summary: "Deleted by id Card."})
  @ApiResponse({
    status: 200,
    description: "One card deleted",
    type: Card
  })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
