import { Injectable } from '@angular/core';
import { PaginationStrategy } from '@firestitch/list';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiStrategy {
  private _activeStrategy = new BehaviorSubject<PaginationStrategy>(PaginationStrategy.Page);

  get activeStrategy() {
    return this._activeStrategy.getValue();
  }

  get strategyChange$(): Observable<PaginationStrategy> {
    return this._activeStrategy.asObservable();
  }

  public setStrategy(strategy: PaginationStrategy) {
    this._activeStrategy.next(strategy);
  }
}
