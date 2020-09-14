import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { random } from 'lodash-es';


@Component({
  selector: 'fs-list-loader',
  templateUrl: './loader.component.html',
  styleUrls: [
    './loader.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsListLoaderComponent implements OnInit {

  public placeholderWidths = [[], [], []];
  public widths = [];

  @Input() columns;

  ngOnInit() {

    this.cols = this.columns > 5 ? this.columns.splice(0, 5) : this.columns;
    const length = this.cols.length;
    for (let w = length; w >= 0; w--) {
      this.widths[w] = w ? random(15, 100 / length, false) : 0;
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < length; c++) {
        this.placeholderWidths[r].push(random(50, 90));
      }
    }
  }

  public cols = [];
}
