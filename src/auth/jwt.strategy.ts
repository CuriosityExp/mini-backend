// src/auth/jwt.strategy.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new InternalServerErrorException('JWT_SECRET environment variable is not defined.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, 
    });
  }

  // This method is called after the token is verified.
  // The payload is the decoded JSON from the JWT.
  async validate(payload: any) {
    // You could add more logic here, e.g., check if the user is banned.
    // The return value is what becomes `request.user`.
    return { userId: payload.sub, username: payload.username };
  }
}