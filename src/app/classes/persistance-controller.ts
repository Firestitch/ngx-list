import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FsPersistanceStore, FsStore } from '@firestitch/store';
import { FsListPersitance } from '../interfaces';

const FILTER_STORE_KEY = 'fs-list-persist';

@Injectable()
export class PersistanceController extends FsPersistanceStore<FsListPersitance> {

  protected STORE_KEY = FILTER_STORE_KEY;

  constructor(
    _store: FsStore,
    _route: ActivatedRoute,
  ) {
    super(_store, _route);
  }

}
