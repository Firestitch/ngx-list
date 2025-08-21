import { Directive, HostListener, Input } from '@angular/core';
import { GroupExpandNotifierService } from '../../services/group-expand-notifier.service';


@Directive({
    selector: '[fsListGroupExpandTrigger]',
    standalone: true
})
export class FsListGroupExpandTriggerDirective {

  @HostListener('click', ['$event'])
  public click(event) {
    event.preventDefault();
    event.stopPropagation();
    this._expandNotifier.toggleExpandStatus(this.row);
  }

  @Input()
  public row;

  constructor(private _expandNotifier: GroupExpandNotifierService) {}
}
