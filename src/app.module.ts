import { User } from './user/entities/user.entity';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    NotificationModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'your-username',
      password: 'your-password',
      database: 'your-database',
      synchronize: true,
      entities: [User],
    }),
  ],
})
export class AppModule {}
