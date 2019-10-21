import { Directive, HostListener, Input } from '@angular/core';
import { ListService } from '../../services';


@Directive({ selector: '[fsListExpandTrigger]' })
export class FsListExpandTriggerDirective {

  @HostListener('click', ['$event'])
  public click(event) {
    event.preventDefault();
    event.stopPropagation();
    this._listService.list.dataController.toggleRowGroup(this.row);
  }

  @Input()
  public row;

  constructor(private _listService: ListService) {}
}
