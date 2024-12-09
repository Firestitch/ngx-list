import { PageChangeType } from '../enums/page-change-type.enum';

export interface QueryPageStrategy {
  page?: number;
  limit?: number;
  recordCount?: boolean;
}

export interface QueryOffsetStrategy {
  offset?: number;
  limit?: number;
  recordCount?: boolean;
}

export interface QueryManyStrategy {
  limit?: number;
  recordCount?: boolean;
}

export interface PageChange {
  type: PageChangeType;
  payload: any;
}
