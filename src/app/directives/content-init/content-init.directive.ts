import { AfterViewInit, Directive, Input } from '@angular/core';


@Directive({
  selector: '[fsListContentInit]'
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
