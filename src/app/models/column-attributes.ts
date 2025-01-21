import { Observable } from 'rxjs';

import { ColumnAsyncAttribute } from './column-async-attribute';

export class ColumnAttributes {

  private _title: string;
  private _name: string;
  private _customizable = true;
  private _sortable: boolean;
  private _sortableDefault: boolean;
  private _direction$ = new ColumnAsyncAttribute(null);
  private _align: string;
  private _width: string;
  private _className: string | string[];
  private _visible$ = new ColumnAsyncAttribute(true);

  constructor(attrs: { [key: string]: any } = {}) {
    this._init(attrs);
  }

  // title
  public set title(value: string) {
    this._title = value;
  }

  public get title(): string {
    return this._title;
  }

  // name
  public set name(value: string) {
    this._name = value;
  }

  public get name(): string {
    return this._name;
  }

  // customize
  public set customizable(value: boolean) {
    this._customizable = value;
  }

  public get customizable(): boolean {
    return this._customizable;
  }

  // sortable
  public set sortable(value: boolean) {
    this._sortable = value;
  }

  public get sortable(): boolean {
    return this._sortable;
  }

  // sortableDefault
  public set sortableDefault(value: boolean) {
    this._sortableDefault = value;

    if (this.sortableDefault) {
      this.sortable = true;
    }
  }

  public get sortableDefault(): boolean {
    return this._sortableDefault;
  }

  // direction
  public set direction(value: 'asc' | 'desc') {
    this.sortable = true;
    
    this._direction$.next(value);
  }

  public get direction(): 'asc' | 'desc' {
    return this._direction$.value;
  }

  public get direction$(): Observable<'asc' | 'desc'> {
    return this._direction$.asObservable();
  }

  // align
  public set align(value: string) {
    this._align = value;
  }

  public get align(): string {
    return this._align;
  }

  // width
  public set width(value: string) {
    this._width = value;
  }

  public get width(): string {
    return this._width;
  }

  // className
  public set className(value: string | string[]) {
    this._className = value;
  }

  public get className(): string | string[] {
    return this._className;
  }

  // visibility
  public set visible(value: boolean) {
    this._visible$.next(value);
  }

  public get visible(): boolean {
    return this._visible$.getValue();
  }

  public get visible$(): Observable<boolean> {
    return this._visible$.asObservable();
  }

  private _init(attrs: { [key: string]: any }) {
    Object.keys(attrs)
      .forEach((key) => {
        switch (key) {
          case 'title': { this.title = attrs[key]; } break;
          case 'name': { this.name = attrs[key]; } break;
          case 'align': { this.align = attrs[key]; } break;
          case 'direction': { this.direction = attrs[key]; } break;
          case 'sortable': { this.sortable = attrs[key]; } break;
          case 'show': { this.visible = attrs[key]; } break;
          case 'visible': { this.visible = attrs[key]; } break;
        }
      });
  }
}
