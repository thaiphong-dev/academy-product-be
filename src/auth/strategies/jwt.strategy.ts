// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { UserService } from '../../user/user.service';
// import { JwtPayload } from './jwt-payload.interface';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UserService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false, // Token expiration is checked automatically
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }

//   async validate(payload: JwtPayload) {
//     try {
//       const user = await this.userService.findById(payload.sub);
//       if (!user) {
//         throw new UnauthorizedException('Invalid token');
//       }
//       return user;
//     } catch (error) {
//       // Handle error properly with a specific exception
//       if (error instanceof UnauthorizedException) {
//         throw error;
//       } else {
//         // You can log or throw a different error if necessary
//         throw new UnauthorizedException('Unauthorized access');
//       }
//     }
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // Ensure JWT_SECRET is defined before using it
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new UnauthorizedException('JWT secret is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Token expiration is checked automatically
      secretOrKey: secret, // Provide secretOrKey
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    } catch (error) {
      // Handle error properly with a specific exception
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        // Log or throw a different error if necessary
        throw new UnauthorizedException('Unauthorized access');
      }
    }
  }
}
