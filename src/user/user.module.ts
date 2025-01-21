import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // To work with TypeORM
import { User } from './entities/user.entity'; // The User entity
import { UserService } from './user.service'; // The service to manage users
import { UserController } from './user.controller'; // Optional: if you expose APIs for users

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Allow TypeORM to access the User entity
  ],
  providers: [UserService], // Register the UserService
  exports: [UserService], // Make the UserService available to other modules like AuthModule
  controllers: [UserController], // Optional: if you need controllers for user-related APIs
})
export class UserModule {}
