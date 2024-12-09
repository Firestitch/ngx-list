import { FsListColumnDirective } from '../directives/column/column.directive';

export type ListColumnConfig = Partial<Pick<
  FsListColumnDirective,
  'className' |
  'headerTemplate'  |
  'headerConfigs'   |
  'cellTemplate'    |
  'cellConfigs'     |
  'footerTemplate'  |
  'footerConfigs'   |
  'groupHeaderTemplate' |
  'groupHeaderConfigs'  |
  'groupFooterTemplate' |
  'groupFooterConfigs'  |
  'expandTrigger' |
  'attributes'
>>;
