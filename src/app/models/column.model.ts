import { Alias, Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';

export enum SortingDirection {
  asc = 0,
  desc = 1
}

export class Column extends Model {
  @Alias() public title;
  @Alias() public align;
  @Alias() public name;
  @Alias() public sortable;
  @Alias('class') public cssClass;

  public template: TemplateRef<any>;
  public sortingDirection: SortingDirection;

  private _ordered = false;

  constructor(colConfig: any = {}) {
    super();

    this._fromJSON(colConfig);

    if (colConfig.template) {
      this.template = colConfig.template;
    }
  }

  get direction() {
    return (this.sortingDirection === SortingDirection.asc) ? 'asc' : 'desc';
  }

  get fullNameDirection() {
    return (this.sortingDirection === SortingDirection.asc) ? 'ascending' : 'descending';
  }

  public changeDirection() {
    if (this.sortingDirection === SortingDirection.asc) {
      this.sortingDirection = SortingDirection.desc;
    } else {
      this.sortingDirection = SortingDirection.asc;
    }
  }

  get ordered() {
    return this._ordered;
  }

  set ordered(value) {
    this._ordered = value;

    if (value) {
      this.sortingDirection = SortingDirection.asc;
    }
  }
}
