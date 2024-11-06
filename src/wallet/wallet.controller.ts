import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Wallet from './models/wallet.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("Wallet")
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Roles('USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @ApiOperation({ summary: "Create wallet."})
  @ApiResponse({
    status:200,
    description: "Create one Wallet.",
    type: Wallet
  })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('transfer')
  async transfer(@Body() transferDto: { cardId: number; walletAmount: number }) {
    return this.walletService.transferToWallet(transferDto.cardId, transferDto.walletAmount);
  }

  @ApiOperation({ summary: "Get all wallet."})
  @ApiResponse({
    status:200,
    description: "List of Wallet.",
    type: [Wallet]
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @ApiOperation({ summary: "Get by id wallet."})
  @ApiResponse({
    status:200,
    description: "see one wallet.",
    type: Wallet
  })
  @Roles('USER','ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }

  @ApiOperation({ summary: "Updated by id wallet."})
  @ApiResponse({
    status:200,
    description: "update one wallet.",
    type: Wallet
  })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @ApiOperation({ summary: "Updated by id wallet."})
  @ApiResponse({
    status:200,
    description: "delete one wallet.",
    type: Wallet
  })
  @Roles('USER','ADMIN', 'USERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
