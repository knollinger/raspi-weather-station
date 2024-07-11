import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * 
 */
@Component({
  selector: 'app-dot-indicator',
  templateUrl: './dot-indicator.component.html',
  styleUrls: ['./dot-indicator.component.css']
})
export class DotIndicatorComponent implements OnInit {

  @Input()
  set count(val: number) {
    this.values = new Array<number>(val);
    for(let i = 0; i < val; ++i) {
      this.values[i] = i;
    }    
  }
  values: number[] = new Array<number>(0);

  @Input()
  current: number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  /**
   * 
   */
  constructor() {
  }

  /**
   * 
   */
  ngOnInit(): void {
  }

  /**
   * 
   * @param val 
   */
  onSelection(val: number) {
    this.current = val;
    this.change.emit(val);
  }
}
