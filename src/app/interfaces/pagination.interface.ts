import { PageChangeType } from '../enums/page-change-type.enum';

export interface QueryPageStrategy {
  page?: number;
  limit?: number;
  records?: boolean;
}

export interface QueryOffsetStrategy {
  offset?: number;
  limit?: number;
  records?: boolean;
}

export interface QueryManyStrategy {
  limit?: number;
  records?: boolean;
}

export interface PageChange {
  type: PageChangeType;
  payload: any;
}
