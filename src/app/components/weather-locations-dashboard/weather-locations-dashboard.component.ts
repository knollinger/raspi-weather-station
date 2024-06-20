import { Component, OnInit } from '@angular/core';

import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { TitlebarService } from '../../services/titlebar.service';

import { Location } from '../../models/location';
import { ICurrentWeather, IShortWeatherDesc } from '../../models/weather-model';

@Component({
  selector: 'app-weather-locations-dashboard',
  templateUrl: './weather-locations-dashboard.component.html',
  styleUrls: ['./weather-locations-dashboard.component.css']
})
export class WeatherLocationsDashboardComponent implements OnInit {

  locations: Location[] = new Array<Location>(0);
  weathers: ICurrentWeather[] = new Array<ICurrentWeather>(0);

  private nrFmt0 = new Intl.NumberFormat('de-DE',
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      minimumIntegerDigits: 1
    }
  );

  private nrFmt1 = new Intl.NumberFormat('de-DE',
    {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      minimumIntegerDigits: 1
    }
  );

  /**
   * 
   * @param titleSvc 
   */
  constructor(
    private titleSvc: TitlebarService,
    private locationSvc: LocationService,
    private weatherSvc: WeatherService) {

  }

  /**
   * 
   */
  ngOnInit(): void {

    this.titleSvc.title = 'Wetter-Übersicht';

    this.loadLocations();
  }

  /**
   * 
   */
  private loadLocations() {

    this.locationSvc.getAllLocations().subscribe(locations => {
      this.locations = locations;
      this.locations.forEach(location => {
        this.weatherSvc.getWeatherFor(location).subscribe(weather => {
          this.weathers.push(weather.current);
        })
      })
    });
  }

  /**
   * 
   * @param location 
   * @returns 
   */
  getLocationIcon(location: Location): string | undefined {

    return location.isHome ? 'home' : undefined;
  }

  /**
   * 
   * @param location 
   * @returns 
   */
  getRouterLink(location: Location): string {
    return `/weatherForecastChooser/${location.uuid}`;
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  getTemperature(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt1.format(this.weathers[index].temp);
    }
    return result;
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  getHumidity(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt0.format(this.weathers[index].humidity);
    }
    return result;
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  getPressure(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt0.format(this.weathers[index].pressure);
    }
    return result;
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  getWindSpeed(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt1.format(this.weathers[index].wind_speed);
    }
    return result;
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  getWindDirection(index: number): number {

    if (this.weathers[index]) {
      return this.weathers[index].wind_deg;
    }
    return 0;
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  getPrecitipation(index: number): string {
    
    let result = '';

    if (this.weathers[index]) {
      const val = this.weathers[index].rain || this.weathers[index].snow || 0;
      result = this.nrFmt0.format(val);
    }
    return result;
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  getIconUrl(index: number): string {

    if (this.weathers[index]) {
      return this.weatherSvc.getIconUrl(this.weathers[index].weather[0]);
    }
    return '';
  }
}
