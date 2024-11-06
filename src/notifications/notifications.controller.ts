import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Notification from './models/notification.model';

@ApiTags("Notification")
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: "Create Notification"})
  @ApiResponse({
    status: 200,
    description: "Create one Notification.",
    type: Notification
  })
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @ApiOperation({ summary: "Get all Notifications"})
  @ApiResponse({
    status: 200,
    description: "List of Notifications.",
    type: [Notification]
  })
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @ApiOperation({ summary: "Get by id Notifications"})
  @ApiResponse({
    status: 200,
    description: "See one Notification.",
    type: Notification
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update by id Notifications"})
  @ApiResponse({
    status: 200,
    description: "One Notification.",
    type: Notification
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @ApiOperation({ summary: "Delete by id Notifications"})
  @ApiResponse({
    status: 200,
    description: "One Notification.",
    type: Notification
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
