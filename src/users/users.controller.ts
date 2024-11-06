import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import User from './models/user.model';
import { PhoneUserDto } from './dto/phone-user.dto';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 

  @ApiOperation({summary: "Create user"})
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Get all Users."})
  @ApiResponse({
    status: 200,
    description: "List of Users",
    type: [User]
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: "Get by id User."})
  @ApiResponse({
    status: 200,
    description: "One user",
    type: User
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({summary: "Update by id User."})
  @ApiResponse({
    status: 200,
    description: "One user update",
    type: User
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary: "Delete by id User."})
  @ApiResponse({
    status: 200,
    description: "One user delete",
    type: User
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
