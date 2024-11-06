import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { AccountNumberService } from './account_number.service';
import { CreateAccountNumberDto } from './dto/create-account_number.dto';
import { UpdateAccountNumberDto } from './dto/update-account_number.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import AccountNumber from './models/account_number.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("Account-Number")
@Controller('account-number')
export class AccountNumberController {
  constructor(private readonly accountNumberService: AccountNumberService) {}


  @ApiOperation({ summary: "Create AccountNumber"})
  @ApiResponse({ 
    status: 200,
    description: "Create one AccountNumber",
    type: AccountNumber
  })
  @Roles('FAMILY')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createAccountNumberDto: CreateAccountNumberDto) {
    return this.accountNumberService.create(createAccountNumberDto);
  }

  @ApiOperation({ summary: "Get all AccountNumbers"})
  @ApiResponse({ 
    status: 200,
    description: "List of AccountNumbers",
    type: [AccountNumber]
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.accountNumberService.findAll();
  }

  @ApiOperation({ summary: "Get by id AccountNumber"})
  @ApiResponse({ 
    status: 200,
    description: "See one AccountNumber",
    type: AccountNumber
  })
  @Roles('FAMILY')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountNumberService.findOne(+id);
  }

  @ApiOperation({ summary: "Update by id AccountNumber"})
  @ApiResponse({ 
    status: 200,
    description: "Update one AccountNumber",
    type: AccountNumber
  })
  @Roles('FAMILY', 'ADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountNumberDto: UpdateAccountNumberDto) {
    return this.accountNumberService.update(+id, updateAccountNumberDto);
  }

  @ApiOperation({ summary: "Delete by id AccountNumber"})
  @ApiResponse({ 
    status: 200,
    description: "Delete one AccountNumber",
    type: AccountNumber
  })
  @Roles('FAMILY', 'ADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountNumberService.remove(+id);
  }
}
