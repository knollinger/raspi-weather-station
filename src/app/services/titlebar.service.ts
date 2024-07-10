import { Injectable } from '@angular/core';

/**
 * 
 */
export interface IToolbarAction {

  icon: string,
  text: string,
  action(): any;
}

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class TitlebarService {

  private _title: string = '';
  private _actions: IToolbarAction[] = new Array<IToolbarAction>(0);

  /**
   * 
   */
  constructor() { }

  /**
   * 
   */
  public set title(title: string) {
    this._title = title;
  }

  /**
   * 
   */
  public get title() {
    return this._title;
  }

  /**
   * 
   */
  public get actions(): IToolbarAction[] {
    return this._actions;
  }

  /**
   * 
   * @param action 
   */
  public addAction(action: IToolbarAction) {
    this.actions.push(action);
  }

  /**
   * 
   * @param action 
   */
  public removeAction(action: IToolbarAction) {
    const index = this.actions.indexOf(action);
    if (index > -1) {
      this.actions.splice(index, 1);
    }
  }
}
