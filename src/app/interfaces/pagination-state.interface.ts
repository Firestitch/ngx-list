export interface IPaginationState {
  enabled: boolean;
  strategy: string;
  page: number;
  offset: number;
  limit: number
  records: number;
  displayed: number;
}
