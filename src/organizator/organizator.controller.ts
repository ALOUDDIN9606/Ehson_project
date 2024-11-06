import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizatorService } from './organizator.service';
import { CreateOrganizatorDto } from './dto/create-organizator.dto';
import { UpdateOrganizatorDto } from './dto/update-organizator.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Organizator from './models/organizator.model';


@ApiTags("Organizator")
@Controller('organizator')
export class OrganizatorController {
  constructor(private readonly organizatorService: OrganizatorService) {}

  @ApiOperation({ summary: "Create Organizator"})
  @ApiResponse({
    status: 200,
    description: "Create organizator",
    type: Organizator
  })
  @Post()
  create(@Body() createOrganizatorDto: CreateOrganizatorDto) {
    return this.organizatorService.create(createOrganizatorDto);
  }

  @ApiOperation({ summary: "Get all Organizators"})
  @ApiResponse({
    status: 200,
    description: "List of organizators",
    type: [Organizator]
  })
  @Get()
  findAll() {
    return this.organizatorService.findAll();
  }

  @ApiOperation({ summary: "Get by id Organizator"})
  @ApiResponse({
    status: 200,
    description: "See one organizator",
    type: Organizator
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizatorService.findOne(+id);
  }

  @ApiOperation({ summary: "Update by id Organizator"})
  @ApiResponse({
    status: 200,
    description: "update one organizator",
    type: Organizator
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizatorDto: UpdateOrganizatorDto) {
    return this.organizatorService.update(+id, updateOrganizatorDto);
  }

  @ApiOperation({ summary: "Delete by id Organizator"})
  @ApiResponse({
    status: 200,
    description: "Delete one organizator",
    type: Organizator
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizatorService.remove(+id);
  }
}
