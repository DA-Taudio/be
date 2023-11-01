import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { DataloaderService } from './dataloaders/dataloader.service';
import { JWT_COMMON } from './auth/constants';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly dataLoaderService: DataloaderService,
  ) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req, payload, connection }) => {
        return {
          payload,
          connection,
          req,
          loaders: this.dataLoaderService.createLoaders(),
        };
      },
      transformAutoSchemaFile: true,
      fieldResolverEnhancers: ['guards', 'interceptors'],
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: async (connectionParams: any) => {
            const connectionParamsLowerKeys: any = connectionParams;
            const authHeader = connectionParamsLowerKeys.authorization;
            let user;
            if (authHeader) {
              const [bearer, idToken] = authHeader.split(' ');
              if (!bearer || bearer.toLowerCase() !== 'bearer') {
                throw new UnauthorizedException();
              }
              if (!idToken) {
                throw new UnauthorizedException();
              }
              const decodedIdToken = await this.jwtService.verify(idToken, {
                secret: JWT_COMMON['accessToken'].privateKey,
              });
              const { uid } = decodedIdToken;
              if (!uid) {
                throw new UnauthorizedException();
              }

              user = null;
            }
            const loaders = this.dataLoaderService.createLoaders();
            return {
              user,
              loaders,
            };
          },
        },
      },
      cors: {
        credentials: true,
        origin: true,
      },
    } as GqlModuleOptions;
  }
}
