import { Component } from '@angular/core';
import { ApiStrategy } from '../../../services/api-strategy.service';


@Component({
  selector: 'app-strategy-base'
})
export class StrategyBaseComponent {
  public showList = true;

  constructor(protected _apiStrategy: ApiStrategy) {
    this._apiStrategy.strategyChange$.subscribe(() => {
      this.showList = false;
      setTimeout(() => {
        this.showList = true;
      }, 200);
    });
  }
}
