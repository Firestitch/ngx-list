import { PageChangeType } from '../enums/page-change-type.enum';

export interface QueryPageStrategy {
  page?: number;
  limit?: number;
}

export interface QueryOffsetStrategy {
  offset?: number;
  limit?: number;
}

export interface PageChange {
  type: PageChangeType;
  payload: any;
}
