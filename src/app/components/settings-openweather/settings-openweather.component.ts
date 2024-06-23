import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { TitlebarService } from '../../services/titlebar.service';
import { SettingsService } from '../../services/settings.service';
import { OpenWeatherSettings } from '../../models/settings';

/**
 * 
 */
@Component({
  selector: 'app-settings-openweather',
  templateUrl: './settings-openweather.component.html',
  styleUrls: ['./settings-openweather.component.css']
})
export class SettingsOpenweatherComponent implements OnInit {

  passwordIconName: string = 'visibility';
  passwordType: string = 'password';

  apiKey = new FormControl('', [Validators.required]);
  refreshInt = new FormControl('', [Validators.required]);
  model: OpenWeatherSettings = OpenWeatherSettings.empty();

  /**
   * 
   * @param titleSvc 
   */
  constructor(
    private titleSvc: TitlebarService,
    private settingsSvc: SettingsService) {

      // 42de26dcb9074467d041e2d48aa12811

  }

  /**
   * 
   */
  ngOnInit(): void {
    this.titleSvc.title = 'Einstellungen - Openweather';
    this.model = this.settingsSvc.getOpenWeatherSettings();
    this.apiKey.setValue(this.model.apiKey);
  }

  /**
   * 
   */
  onSubmit() {
    this.model.apiKey = this.apiKey.value;
    // this.model.refreshInt = this.refreshInt.value;
    this.settingsSvc.saveOpenWeatherSettings(this.model);
  }

  /**
   * 
   */
  togglePasswordVisibility() {

    if (this.passwordIconName === 'visibility') {
      this.passwordIconName = 'visibility_off';
      this.passwordType = 'text';
    }
    else {
      this.passwordIconName = 'visibility'
      this.passwordType = 'password';
    }
  }
}
