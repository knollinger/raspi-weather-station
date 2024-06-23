import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map, of } from 'rxjs'

import { SettingsService } from './settings.service';

import { Location } from '../models/location';
import { IShortWeatherDesc, IWeatherModel } from '../models/weather-model';

/**
 * 
 */
class CacheEntry {

  /**
   * 
   * @param created 
   * @param model 
   */
  constructor(
    private _created: number,
    private _model: IWeatherModel) {
  }

  /**
   * Ein CacheEntry ist 15min lang gültig, erst danach muss er neu
   * erzeugt werden.
   *  
   * @returns 
   */
  public isValid(): boolean {

    const now = new Date();
    const diff = now.getTime() - this._created;
    return diff < (15 * 60 * 1000);
  }

  /**
   * 
   * @returns 
   */
  public get model(): IWeatherModel {
    return this._model;
  }
}

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  private static iconMappings = new Map<string, string>(
    [
      ['01d', 'weather-clear-day'],
      ['01n', 'weather-clear-night'],
      ['02d', 'weather-few-clouds-day'],
      ['02n', 'weather-few-clouds-night'],
      ['03d', 'weather-few-clouds-day'],
      ['03n', 'weather-few-clouds-night'],
      ['04d', 'weather-clouds-day'],
      ['04n', 'weather-clouds-night'],
      ['09d', 'weather-showers-scattered-day'],
      ['09n', 'weather-showers-scattered-night'],
      ['10d', 'weather-showers-day'],
      ['10n', 'weather-showers-night'],
      ['11d', 'weather-storm-day'],
      ['11n', 'weather-storm-night'],
      ['13d', 'weather-snow-scattered-day'],
      ['13n', 'weather-snow-scattered-night'],
      ['50d', 'weather-mist'],
      ['50n', 'weather-mist'],
    ]
  );

  private openweatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=<lat>&lon=<lon>&exclude=minutely,alerts&units=metric&appid=<apiKey>&lang=de';
  private openweatherApiKey: string = '';
  // private openweatherApiKey = '42de26dcb9074467d041e2d48aa12811';
  private chache: Map<string, CacheEntry> = new Map<string, CacheEntry>();

  /**
   * 
   * @param httpClient 
   * @param backendRoutesSvc 
   */
  constructor(
    private settingsSvc: SettingsService,
    private httpClient: HttpClient) {

      this.openweatherApiKey = settingsSvc.getOpenWeatherSettings().apiKey;
  }

  /**
   * 
   * @param location 
   * @returns 
   */
  public getWeatherFor(location: Location): Observable<IWeatherModel> {

    const cached = this.getFromCache(location);
    if(cached) {
      console.log('cache hit')
      return of(cached);
    }
    console.log('cache miss')
    return this.getFromServer(location);
  }

  /**
   * 
   * @param location 
   */
  private getFromCache(location: Location): IWeatherModel | null {

    let result: IWeatherModel | null = null;
    const key = this.createStorageKey(location);
    const val = this.chache.get(key);
    return (val && val.isValid()) ? val.model : null;
  }

  /**
   * Lade das Wettermodel vom Server
   * 
   * @param location 
   * @returns 
   */
  private getFromServer(location: Location): Observable<IWeatherModel> {

    const url = this.openweatherUrl //
      .replace('<lat>', '' + location.latitude) //
      .replace('<lon>', '' + location.longitude) //
      .replace('<apiKey>', this.openweatherApiKey);

    return this.httpClient.get<IWeatherModel>(url).pipe(
      map(snapshot => {
        this.setToCache(location, snapshot);
        return snapshot;
      })
    );
  }

  /**
   * 
   * @param location 
   * @param weather 
   */
  private setToCache(location: Location, weather: IWeatherModel) {

    const key = this.createStorageKey(location);
    const entry = new CacheEntry(new Date().getTime(), weather);
    this.chache.set(key, entry);
  }

  /**
   * 
   */
  private createStorageKey(location: Location): string {
    
    return `${location.latitude}-${location.longitude}`;
  }


  /**
   * 
   * @returns 
   */
  getIconUrl(weather: IShortWeatherDesc): string {

    let base = 'weather-none-available';
    if (weather) {
      base = WeatherService.iconMappings.get(weather.icon) || 'weather-none-available';
    }
    return `/assets/images/${base}.svg`;
  }
}
