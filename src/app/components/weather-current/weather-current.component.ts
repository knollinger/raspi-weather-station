import { Component, OnDestroy, OnInit } from '@angular/core';

import { Location } from '../../models/location';

import { IToolbarAction, TitlebarService } from '../../services/titlebar.service';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { ICurrentWeather } from '../../models/weather-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.css']
})
export class WeatherCurrentComponent implements OnInit, OnDestroy {

  currLocIdx: number = -1;
  locations: Location[] = new Array<Location>(0);
  private timerId: number = 0;
  private currentWeather: ICurrentWeather | null = null;
  private weatherSubscr: any;
  private showDaily: IToolbarAction;
  private showWeekly: IToolbarAction;

  /**
   * 
   * @param titleBarSvc 
   * @param locSvc 
   * @param weatherSvc 
   */
  constructor(
    private titleBarSvc: TitlebarService,
    private locSvc: LocationService,
    private weatherSvc: WeatherService,
    private router: Router) {

    this.showDaily = {
      icon: 'today',
      text: 'Tages-Vorschau',
      action: () => {
        const url = `/dailyWeatherForecast/${this.locations[this.currLocIdx].uuid}`;
        this.router.navigateByUrl(url);
      }
    }
    this.showWeekly = {
      icon: 'date_range',
      text: 'Wochen-Vorschau',
      action: () => {
        const url = `/weeklyWeatherForecast/${this.locations[this.currLocIdx].uuid}`;
        this.router.navigateByUrl(url);
      }
    }
  }

  /**
   * 
  */
  ngOnInit(): void {

    this.locations = this.locSvc.getAllLocations();
    this.timerId = window.setInterval(() => {
      this.nextLocation();
    }, 10000);
    this.nextLocation();

    this.titleBarSvc.addAction(this.showDaily);
    this.titleBarSvc.addAction(this.showWeekly);
  }

  /**
   * 
   */
  ngOnDestroy() {

    this.titleBarSvc.removeAction(this.showDaily);
    this.titleBarSvc.removeAction(this.showWeekly);

    window.clearInterval(this.timerId);
    if (this.weatherSubscr) {
      this.weatherSubscr.unsubscribe();
    }
  }

  /**
   * 
   */
  nextLocation() {

    this.currLocIdx++;
    if (this.currLocIdx >= this.locations.length) {
      this.currLocIdx = 0;
    }
    this.updateLocation();
  }

  /**
   * 
   */
  private updateLocation() {

    const location = this.locations[this.currLocIdx];
    this.titleBarSvc.title = location.name;

    if (this.weatherSubscr) {
      this.weatherSubscr.unsubscribe();
    }

    this.weatherSubscr = this.weatherSvc.getWeatherFor(location).subscribe(w => {
      this.currentWeather = w.current;
    })
  }

  /**
   * 
   * @param evt 
   * @param locIdx 
   */
  onLocationSelection(locIdx: number) {
  // onLocationSelection(evt: Event, locIdx: number) {
  //     evt.stopPropagation();
    this.currLocIdx = locIdx;
    this.updateLocation();
  }

  /**
   * 
   * @returns 
   */
  get weatherIconUrl(): string {
    return this.currentWeather ? this.weatherSvc.getIconUrl(this.currentWeather.weather[0]) : '';
  }

  /**
   * 
   */
  get temperature(): number {
    return this.currentWeather ? this.currentWeather.temp : 0;
  }

  /**
   * 
   */
  get humidity(): number {
    return this.currentWeather ? this.currentWeather.humidity : 0;
  }

  /**
   * 
   */
  get pressure(): number {
    return this.currentWeather ? this.currentWeather.pressure : 0;
  }

  /**
   * 
   */
  get windSpeed(): number {
    return this.currentWeather ? this.currentWeather.wind_speed : 0;
  }

  /**
   * 
   */
  get windDirection(): number {
    return this.currentWeather ? this.currentWeather.wind_deg : 0;
  }

  /**
   * 
   */
  get precitipation(): number {

    let result = 0;
    if (this.currentWeather) {

      if (this.currentWeather.rain) {
        result = this.currentWeather.rain["1h"];
      }
      else {
        if (this.currentWeather.snow) {
          result = this.currentWeather.snow["1h"];
        }
      }
    }
    return result;
  }
}
