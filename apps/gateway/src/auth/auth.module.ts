import { Module } from '@nestjs/common';
import { AuthResolver, UserLoaderResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SmsService } from '../sms/sms.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AdminStrategy } from './strategy/admin.strategy';

@Module({
  imports: [PassportModule],
  providers: [
    AuthResolver,
    AuthService,
    JwtModule,
    SmsService,
    JwtStrategy,
    UserLoaderResolver,
    AdminStrategy,
  ],
})
export class AuthModule {}
