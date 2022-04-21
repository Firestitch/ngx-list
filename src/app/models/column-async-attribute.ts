import { BehaviorSubject } from 'rxjs';

export class ColumnAsyncAttribute<T> extends BehaviorSubject<T> {

  constructor(value: T) {
    super(Object.freeze(value));
  }

  public next(value: T): void {
    const newValue = value;
    const oldValue = this.getValue();

    if (newValue !== oldValue) {
      super.next(Object.freeze(value));
    }
  }
}
