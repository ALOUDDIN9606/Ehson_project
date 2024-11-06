import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Family from './models/family.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Family")
@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @ApiOperation({ summary: "Create Family."})
  @ApiResponse({
    status: 200,
    description: "Create one Family.",
    type: Family
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familyService.create(createFamilyDto);
  }

  @ApiOperation({ summary: "Get all Familys."})
  @ApiResponse({
    status: 200,
    description: "List of Familys.",
    type: [Family]
  })
  @Roles('ADMIN', 'SUPERADMIN', 'USER')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.familyService.findAll();
  }

  @ApiOperation({ summary: "Get by id Family."})
  @ApiResponse({
    status: 200,
    description: "See one Family.",
    type: Family
  })
  @Roles('ADMIN', 'SUPERADMIN', 'USER')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyService.findOne(+id);
  }

  @ApiOperation({ summary: "Update by id Family."})
  @ApiResponse({
    status: 200,
    description: "Update oneFamily.",
    type: Family
  })
  @Roles('ADMIN', 'SUPERADMIN')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familyService.update(+id, updateFamilyDto);
  }

  @ApiOperation({ summary: "Delete by id Family."})
  @ApiResponse({
    status: 200,
    description: "Delete oneFamily.",
    type: Family
  })
  @Roles('ADMIN', 'SUPERADMIN','FAMILY')
  @UseGuards(RolesGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyService.remove(+id);
  }
}
