import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  templateUrl: 'examples.component.html',
  styleUrls: [
    './examples.component.scss',
  ]
})
export class ExamplesComponent {
  public config = environment;
}
