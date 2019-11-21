import { Component, Input } from '@angular/core';

@Component({
  selector: 'fs-list-loader',
  templateUrl: './loader.component.html',
  styleUrls: [
    './loader.component.scss',
  ]
})
export class FsListLoaderComponent {

  @Input()
  public columns;

}
