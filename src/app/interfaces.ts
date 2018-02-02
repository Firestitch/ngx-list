export interface IPaging {
  limit: number;
  page: number;
  pages: number;
  records: number;
}

export interface FsListCell {
  value?: string;
  onclick?: any;
  onhover?: any;
  html?: string;
  parts?: FsListPart[];
  icon?: string;
}

export interface FsListPart {
  value?: string;
  onclick?: any;
  onhover?: any;
  html?: string;
  icon?: string;
}

export interface TopActions {
  label: string;
  primary: boolean;
  raised: boolean;

  click(): void;
}

export interface CellConfig {
  colspan?: string;
  align?: string;
  styleClass?: string | string[];
}
