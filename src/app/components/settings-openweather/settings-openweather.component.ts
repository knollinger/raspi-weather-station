import { Component, OnInit } from '@angular/core';
import { TitlebarService } from '../../services/titlebar.service';

@Component({
  selector: 'app-settings-openweather',
  templateUrl: './settings-openweather.component.html',
  styleUrls: ['./settings-openweather.component.css']
})
export class SettingsOpenweatherComponent implements OnInit {

  constructor(
    private titleSvc: TitlebarService) {

  }

  ngOnInit(): void {
    this.titleSvc.title = 'Einstellungen - Openweather';
  }
}
