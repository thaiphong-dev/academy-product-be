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
      host: 'DESKTOP-P12J8O0\\PHONG1', // Use your server's name here
      port: 1433,
      username: 'sa',
      password: '123',
      database: 'nambeacademy',
      synchronize: true,
      entities: [User],
      extra: {
        encrypt: true, // Enable encryption (recommended for security)
        trustServerCertificate: true, // Disable SSL verification for self-signed certificates
      },
    }),
  ],
})
export class AppModule {}
