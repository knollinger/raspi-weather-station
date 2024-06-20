import { Component, OnInit } from '@angular/core';
import { TitlebarService } from '../../services/titlebar.service';

@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.css']
})
export class SettingsMainComponent implements OnInit {

  constructor(private titleSvc: TitlebarService) { }

  ngOnInit(): void {
    this.titleSvc.title = 'Einstellungen';
  }
}
