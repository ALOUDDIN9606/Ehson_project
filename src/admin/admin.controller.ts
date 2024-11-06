import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SignInDto } from './dto/signIn.dto';
import { CookieGetter } from './dto/cookie-getter.decorator';
import { CreatorGuard } from 'src/guards/creator.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  
  // ===== Create ======
  @Post('create')
  @ApiOperation({
    summary: 'Create admin',
    description: 'Create admin',
  })
  @UseGuards(CreatorGuard)
  @HttpCode(200)
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  
  @Get()
  @ApiOperation({
    summary: 'Get all admins',
    description: 'Get all admins',
  })
  @UseGuards(CreatorGuard)
  @HttpCode(200)
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({
    summary: 'Get admin by id',
    description: 'Get admin by id',
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update admin by id',
    description: 'Update admin by id',
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete admin by id',
    description: 'Delete admin by id',
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
