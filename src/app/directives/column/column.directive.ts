import {
  ChangeDetectorRef,
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

// Directives
import { FsListHeaderDirective } from '../header/header.directive';
import { FsListCellDirective } from '../cell/cell.directive';
import { FsListFooterDirective } from '../footer/footer.directive';

import { CellConfig } from '../../interfaces';
import { FsListGroupCellDirective } from '../group-cell/group-cell.directive';
import { FsListGroupExpandTriggerDirective } from '../group-expand-trigger/group-expand-trigger.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective implements OnChanges, OnDestroy {

  @Input() public title: string;
  @Input() public name: string;
  @Input() public customize = true;
  @Input() public sortable: boolean;
  @Input() public sortableDefault: boolean;
  @Input() public direction: 'asc' | 'desc';
  @Input() public align: string;
  @Input() public width: string;
  @Input('class') public className: string | string[];
  @Input() public show = true;

  private _destroy$ = new Subject();
  private _columnVisibilityChange$ = new Subject<{ name: string; show: boolean }>();

  // Header
  @ContentChild(FsListHeaderDirective, { read: TemplateRef, static: true })
  public headerTemplate: TemplateRef<any>;

  @ContentChild(FsListHeaderDirective, { static: true })
  public headerConfigs: CellConfig;

  // Group
  @ContentChild(FsListGroupCellDirective, { read: TemplateRef, static: true })
  public groupCellTemplate: TemplateRef<any>;

  @ContentChild(FsListGroupCellDirective, { static: true })
  public groupCellConfigs: CellConfig;

  // Trigger
  @ContentChildren(FsListGroupExpandTriggerDirective, { descendants: true })
  public expandTrigger: QueryList<FsListGroupExpandTriggerDirective>;

  // Cell
  @ContentChild(FsListCellDirective, { read: TemplateRef, static: true })
  public cellTemplate: TemplateRef<any>;

  @ContentChild(FsListCellDirective, { static: true })
  public cellConfigs: CellConfig;

  // Footer
  @ContentChild(FsListFooterDirective, { read: TemplateRef, static: true })
  public footerTemplate: TemplateRef<any>;

  @ContentChild(FsListFooterDirective, { static: true })
  public footerConfigs: CellConfig;
  
  public get columnVisibilityChange$() {
    return this._columnVisibilityChange$
    .pipe(
      takeUntil(this._destroy$),
    );
  }
  
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.show?.firstChange === false) {
      if (changes.show.previousValue !== changes.show.currentValue) {
        this._columnVisibilityChange$.next({ name: this.name, show: changes.show.currentValue });
      }
    }
  }
}
