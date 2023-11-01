import {
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/proto-schema/proto/user.pb';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_COMMON } from '../constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private userService: UsersServiceClient;
  constructor(
    @Inject(USERS_SERVICE_NAME) private readonly userClients: ClientGrpc,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        ignoreNotBefore: true,
      },
      secretOrKey: JWT_COMMON['accessToken'].privateKey,
    });
    this.userService =
      this.userClients.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async validate(payload: any) {
    const { uid: _id } = payload;
    const { user } = await firstValueFrom(this.userService.readUser({ _id }));
    return user;
  }
}
