import { FsListColumnDirective } from '@firestitch/list';

export type FsListColumnConfig = Partial<Pick<
  FsListColumnDirective,
  'className' |
  'headerTemplate'  |
  'headerConfigs'   |
  'cellTemplate'    |
  'cellConfigs'     |
  'footerTemplate'  |
  'footerConfigs'   |
  'groupCellTemplate' |
  'groupCellConfigs'  |
  'expandTrigger' |
  'attributes'
>>;
