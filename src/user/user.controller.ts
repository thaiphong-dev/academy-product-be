import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { BookingDto } from './dto/booking.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('book_class')
  async bookClass(data: { userId: string; bookingDto: BookingDto }) {
    return this.userService.bookClass(data.userId, data.bookingDto);
  }

  @MessagePattern('view_booking_info')
  async viewBookingInfo(data: { userId: string }) {
    return this.userService.viewBookingInfo(data.userId);
  }
}
