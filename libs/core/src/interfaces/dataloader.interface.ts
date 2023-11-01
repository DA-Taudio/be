import { IDataloaders } from 'apps/gateway/src/dataloaders/dataloader.service';

export interface IGraphQLContext {
  loaders: IDataloaders;
}
