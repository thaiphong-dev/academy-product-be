import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('send_notification')
  async sendNotification(data: { userId: string; message: string }) {
    return this.notificationService.sendNotification(data.userId, data.message);
  }
}
