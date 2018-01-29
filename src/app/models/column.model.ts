import { Alias, Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';

export enum SortingDirection {
  asc = 0,
  desc = 1
}

export class Column extends Model {
  @Alias() public title: string;
  @Alias() public name: string;
  @Alias() public sortable: boolean;
  @Alias() public headerAlign: string;
  @Alias() public headerClass: string | string[] = '';
  @Alias() public cellAlign: string;
  @Alias() public cellClass: string | string[] = '';

  public template: TemplateRef<any>;
  public sortingDirection: SortingDirection;
  public headStyles = [];
  public cellStyles = [];
  private _ordered = false;

  constructor(colConfig: any = {}) {
    super();

    this._fromJSON(colConfig);

    if (colConfig.template) {
      this.template = colConfig.template;
    }

    this.headStyles = this.getClassesArray(this.headerAlign, this.headerClass);
    this.cellStyles = this.getClassesArray(this.cellAlign, this.cellClass);
  }

  get direction() {
    return (this.sortingDirection === SortingDirection.asc) ? 'asc' : 'desc';
  }

  get fullNameDirection() {
    return (this.sortingDirection === SortingDirection.asc) ? 'ascending' : 'descending';
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

  public getAlignClass(align) {
    if (align && ['left', 'center', 'right'].indexOf(align) > -1) {
      return align
    } else {
      return 'left'
    }
  }

  public getClassesArray(align, cssClass) {
    const alignClass = this.getAlignClass(align) || [];
    let classArray = [];

    if (Array.isArray(cssClass)) {
      classArray = classArray.concat(cssClass, alignClass);
    } else if (cssClass) {
      classArray = classArray.concat(cssClass, alignClass);
    } else {
      classArray = classArray.concat(this.getAlignClass(align));
    }

    return classArray;
  }

  public changeDirection() {
    if (this.sortingDirection === SortingDirection.asc) {
      this.sortingDirection = SortingDirection.desc;
    } else {
      this.sortingDirection = SortingDirection.asc;
    }
  }
}
