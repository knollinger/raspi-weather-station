import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  icon: string | undefined = undefined;

  /**
   * 
   */
  constructor() { }

  /**
   * 
   */
  ngOnInit(): void {
  }
}
