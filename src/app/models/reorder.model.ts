import { Alias, Model } from 'tsmodels';
import { List } from './list.model';


export enum ReorderPosition {
  Left = 'left',
  Right = 'right',
}

export enum ReorderStrategy {
  Always = 'always',
  Manual = 'manual',
  Custom = 'custom',
}


export class ReorderModel extends Model {
  @Alias() public start: Function;
  @Alias() public done: Function;
  @Alias() public label: string;
  @Alias() public menu: boolean;
  @Alias() public position: ReorderPosition;
  @Alias() public strategy: ReorderStrategy;

  private _enabled = false;

  constructor(private _list: List, data: any = {}) {
    super();

    this._fromJSON(data);
  }

  get enabled() {
    return this._enabled;
  }

  get manualReorderActivated() {
    return this.enabled && this.strategy === ReorderStrategy.Manual
  }

  set enabled(value) {
    this._enabled = value;

    if (this.strategy === ReorderStrategy.Manual || this.strategy === ReorderStrategy.Custom) {

      if (value) {
        // Fire callback that reorder was started
        this.reorderStarted();
      } else {
        this.reorderFinished();
      }
    }
  }

  public _fromJSON(data) {
    super._fromJSON(data);

    if (data.menu === void 0) { // FIXME must be fixed after tsmodels defaults will be released
      this.menu = true;
    }

    if (data.position === void 0) {
      this.position = ReorderPosition.Left;
    }

    if (data.strategy === void 0) {
      this.strategy = ReorderStrategy.Manual;
    } else if (data.strategy === ReorderStrategy.Always) {
      this.enabled = true;
    }
  }

  /**
   * If reorder strategy Always and drag was started or finished
   * @param status
   */
  public reorderChanged(status: boolean) {
    if (status) {
      this.reorderStarted();
    } else {
      this.reorderFinished();
    }
  }

  /**
   * If reorder strategy Manual and Done button was clicked
   */
  public finishReorder() {
    this.enabled = false;
  }

  /**
   * Exec start callback
   */
  public reorderStarted() {
    if (this.start) {
      this.start();
    }
  }

  /**
   * Exec end callback
   */
  public reorderFinished() {
    if (this.done) {
      this.done(this._list.data);
    }
  }
}
