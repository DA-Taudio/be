import { SortDirection, SortFieldInput } from '@app/proto-schema/proto/base.pb';

export const deriveSortQueryToMongoDBSort = (sorts?: SortFieldInput[]) => {
  if (!sorts) return null;

  return sorts.map(
    ({ sortDirection, sortField }) => sortField + '_' + sortDirection,
  );
};

export const deriveObjectSortQueryToMongoDBSort = (sort: {
  [sortName: string]: SortDirection;
}) => {
  if (!sort) return null;
  return Object.entries(sort).map(
    ([sortName, sortValue]) => sortName + '_' + sortValue,
  );
};
