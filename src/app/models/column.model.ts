import { Alias, Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';

export class Column extends Model {
  @Alias() public title;
  @Alias() public align;
  @Alias() public name;
  @Alias('class') public cssClass;

  public template: TemplateRef<any>;

  constructor(colConfig: any = {}) {
    super();

    this._fromJSON(colConfig);

    if (colConfig.template) {
      this.template = colConfig.template;
    }
  }

  // get cssClasses() {
  //   return `${(this.cssClass || '')}`;
  // }
}
