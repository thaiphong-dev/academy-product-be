/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  @Client({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3001 },
  })
  client: ClientTCP;

  async sendNotification(userId: string, message: string) {
    try {
      // Here, you can integrate with an actual notification service
      const result = await this.client.send('send_notification', {
        userId,
        message,
      });
      return result;
    } catch (error) {
      throw new Error('Failed to send notification');
    }
  }
}
