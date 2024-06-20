import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '../../models/location';

import { TitlebarService } from '../../services/titlebar.service';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { IDailyWeather } from '../../models/weather-model';

@Component({
  selector: 'app-weather-weekly-forecast-dashboard',
  templateUrl: './weather-weekly-forecast-dashboard.component.html',
  styleUrls: ['./weather-weekly-forecast-dashboard.component.css']
})
export class WeatherWeeklyForecastDashboardComponent implements OnInit {

  private static dateFmt = new Intl.DateTimeFormat('de-DE',
    {
      weekday: "short",
      month: "numeric",
      day: "numeric",
      year: "2-digit"
    }
  );

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

  location: Location = Location.empty();
  weathers: IDailyWeather[] = new Array<IDailyWeather>(0);

  /**
   * 
   * @param route 
   * @param titlebarSvc 
   * @param locationSvc 
   */
  constructor(
    private route: ActivatedRoute,
    private titlebarSvc: TitlebarService,
    private locationSvc: LocationService,
    private weatherSvc: WeatherService) {

  }

  /**
   * 
   */
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const uuid = params.get('uuid');
      if (uuid) {
        this.locationSvc.getLocation(uuid).subscribe(location => {
          this.location = location;
          this.titlebarSvc.title = `Wochen-Vorschau für ${location.name}`;

          this.weatherSvc.getWeatherFor(location).subscribe(weather => {
            this.weathers = weather.daily;
            console.log(this.weathers.length);
          });
        })
      }
    })
  }

  getDate(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      const date = new Date(this.weathers[index].dt * 1000);
      result = WeatherWeeklyForecastDashboardComponent.dateFmt.format(date);
    }
    return result;
  }

  getIconUrl(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.weatherSvc.getIconUrl(this.weathers[index].weather[0]);
    }
    return result;
  }

  getDayTemp(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt1.format(this.weathers[index].temp.day);
    }
    return result;
  }

  getNightTemp(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt1.format(this.weathers[index].temp.night);
    }
    return result;
  }

  getHumidity(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt0.format(this.weathers[index].humidity);
    }
    return result;
  }

  getPressure(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt0.format(this.weathers[index].pressure);
    }
    return result;
  }

  getWindSpeed(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt1.format(this.weathers[index].wind_speed);
    }
    return result;
  }

  getPop(index: number): string {

    let result = '';
    if (this.weathers[index]) {
      result = this.nrFmt0.format(this.weathers[index].pop);
    }
    return result;
  }


  getPrecitipation(index: number): string {

    let result = '';
    if (this.weathers[index]) {

      const val = this.weathers[index].rain || this.weathers[index].snow || 0;
      result = this.nrFmt0.format(val);
    }
    return result;
  }
}
