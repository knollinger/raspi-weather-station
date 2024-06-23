import { Injectable } from '@angular/core';

import { OpenWeatherSettings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  /**
   * 
   * @returns 
   */
  public getOpenWeatherSettings(): OpenWeatherSettings {
    const json = window.localStorage.getItem('settings.openweather');
    return (json) ? OpenWeatherSettings.fromJSON(JSON.parse(json)) : OpenWeatherSettings.empty();
  } 

  /**
   * 
   * @param settings 
   */
  public saveOpenWeatherSettings(settings: OpenWeatherSettings) {
    const json = settings.toJSON();
    window.localStorage.setItem('settings.openweather', JSON.stringify(json));
  }
}
