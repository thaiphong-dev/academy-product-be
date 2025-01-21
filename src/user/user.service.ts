import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async bookClass(userId: string, bookingDto: BookingDto) {
    const { className } = bookingDto;

    // Convert userId to a number if it's a string
    const userIdAsNumber = Number(userId);

    // Correctly use findOne with the 'where' clause
    const user = await this.userRepository.findOne({
      where: { id: userIdAsNumber },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.bookingInfo = `Booked for class: ${className}`;
    await this.userRepository.save(user);

    return { message: 'Class booked successfully', user };
  }

  async viewBookingInfo(userId: string) {
    // Convert userId to a number if it's a string
    const userIdAsNumber = Number(userId);

    // Correctly use findOne with the 'where' clause
    const user = await this.userRepository.findOne({
      where: { id: userIdAsNumber },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      bookingInfo: user.bookingInfo || 'No booking information available',
    };
  }

  async findById(id: string) {
    // Convert the id to a number and use the 'where' clause correctly
    const idAsNumber = Number(id);
    return this.userRepository.findOne({ where: { id: idAsNumber } });
  }
}
