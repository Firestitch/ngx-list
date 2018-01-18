import { Component, ViewEncapsulation } from '@angular/core';

import { FsArray } from '@firestitch/common';
import { FsApi } from '@firestitch/api';

@Component({
  selector: 'fs-app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['../styles/styles.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(fsArray: FsArray, fsApi: FsApi) {
  }
}
