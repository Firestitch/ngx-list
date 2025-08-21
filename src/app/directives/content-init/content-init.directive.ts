import { AfterViewInit, Directive, Input } from '@angular/core';


@Directive({
    selector: '[fsListContentInit]',
    standalone: true
})
export class FsListContentInitDirective implements AfterViewInit {

  @Input('fsListContentInit')
  public contentInitCallback: Function;

  constructor() {}

  public ngAfterViewInit() {
    if (this.contentInitCallback) {
      this.contentInitCallback();
    }
  }
}
