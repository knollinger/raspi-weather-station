import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitlebarService {

  private _title: string = '';

  constructor() { }

  public set title(title: string) {
    this._title = title;
  }

  public get title() {
    return this._title;
  }
}
