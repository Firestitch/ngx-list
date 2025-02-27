import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';


import { getNormalizedPath } from '@firestitch/common';
import { FsStore } from '@firestitch/store';

import { FsListPersistanceConfig, FsListPersitance } from '../interfaces';


@Injectable()
export class PersistanceController {

  public filtersEnabled = false;
  public columnsEnabled = false;
  public pagingEnabled = false;
  public sortingEnabled = false;
  public queryEnabled = false;
  public name: string;

  private _store = inject(FsStore);  
  private _data: any = {};
  private readonly _storeKey = 'fs-list-persist';

  private _location = inject(Location);


  public init(listConfig: FsListPersitance, inDialog: boolean) {
    const config = this._initConfig(listConfig, inDialog);

    if(config) {
      this.filtersEnabled = config.persistFilter;
      this.columnsEnabled = config.persistColumn;
      this.pagingEnabled = config.persistPaging;
      this.sortingEnabled = config.persistSorting;
      this.queryEnabled = config.persistQuery;
      this.name = config.name;
      this._data = this._get() || {};
    }
  }

  public setSorting(value: any) {
    this._set('sorting', value);
  }

  public setPaging(value: any) {
    this._set('paging', value);
  }

  public setColumns(value: any) {
    this._set('columns', value);
  }

  public getColumns() {
    return this._data.columns || [];
  }

  public getSorting() {
    return this._data.sorting || {};
  }

  public getPaging() {
    return this._data.paging || {};
  }

  private _set(key: string, value: any) {
    this._data[key] = value;
    const storeData = this._store.get(this._storeKey) || {};
    storeData[this.name] = this._data;

    this._store.set(this._storeKey, storeData);
  }

  private _get() {
    const storeData = this._store.get(this._storeKey);

    if (storeData) {
      return storeData[this.name];
    }
 
    return {};
  }

  private _initConfig(config: FsListPersitance, inDialog: boolean): FsListPersistanceConfig {
    let persistanceConfig = this._getConfig(config);

    if(persistanceConfig) {
      const persist = !inDialog || !!persistanceConfig.name;

      persistanceConfig = {
        name: persistanceConfig.name || getNormalizedPath(this._location),
        persistFilter: persist,
        persistPaging: persist,
        persistSorting: persist,
        persistColumn: persist,
        persistQuery: persist,
        ...persistanceConfig,
      };
    }
  
    return persistanceConfig;
  }

  private _getConfig(config: FsListPersitance): FsListPersistanceConfig {
    if(config) {
      return {
        ...(config === true ? {} : config),
      };
    }

    return null;
  }

}
