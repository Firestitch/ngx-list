import { Component, Input } from '@angular/core';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'fs-list-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: [
    './pagination.component.scss'
  ]
})
export class FsPaginationComponent {
  @Input() pagination: Pagination;
}
