import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginOrCreateCommand } from '../impl';
import { UserRepository } from '../../../users.repository';
import {
  LoginOrCreateAccountRequest,
  LoginOrCreateAccountResponse,
  Provider,
} from '@app/proto-schema/proto/user.pb';
import {
  AppleService,
  FacebookService,
  GoogleService,
  UserEntity,
} from '@app/core';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(LoginOrCreateCommand)
export class LoginOrCreateHandler
  implements ICommandHandler<LoginOrCreateCommand>
{
  constructor(
    private _userRepository: UserRepository,
    private readonly _facebookService: FacebookService,
    private readonly _googleService: GoogleService,
    private readonly _appleService: AppleService,
  ) {}
  async execute(
    command: LoginOrCreateCommand,
  ): Promise<LoginOrCreateAccountResponse> {
    const { cmd } = command;
    const { provider, accessToken } = cmd;
    const { email, id, name, ...usser } =
      provider === Provider.Facebook
        ? await this._facebookService.getUserInfo(accessToken)
        : provider === Provider.Google
        ? await this._googleService.getUserInfo(accessToken)
        : await this._appleService.getUserInfo(accessToken);
    if (!email) {
      throw new RpcException(`No email returned from ${provider} provider`);
    }
    let user = await this._userRepository.findOne({
      where: { email },
    });
    if (user) {
      if (!user.active) throw new RpcException('Tài khoản của bạn đã bị khoá!');
      await this._userRepository.update(
        {
          _id: user._id,
        },
        {
          provider,
          providerId: id,
        },
      );
    } else {
      user = await this._userRepository.save(
        new UserEntity({
          email,
          provider,
          providerId: id,
          fullName: name,
          verified: true,
          verifyEmail: true,
        }),
      );
    }

    return { user } as unknown as LoginOrCreateAccountResponse;
  }
}
