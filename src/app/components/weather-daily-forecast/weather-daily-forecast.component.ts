import { Component, OnInit } from '@angular/core';

import { IBaseWeather } from '../../models/weather-model';
import { Location } from '../../models/location';
import { ActivatedRoute } from '@angular/router';
import { TitlebarService } from '../../services/titlebar.service';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-daily-forecast',
  templateUrl: './weather-daily-forecast.component.html',
  styleUrls: ['./weather-daily-forecast.component.css']
})
export class WeatherDailyForecastComponent implements OnInit {

  location: Location = Location.empty();
  weathers: IBaseWeather[] = new Array<IBaseWeather>(0);

  /**
   * 
   * @param route 
   * @param titlebarSvc 
   * @param locationSvc 
   * @param weatherSvc 
   */
  constructor(
    private route: ActivatedRoute,
    private titlebarSvc: TitlebarService,
    private locationSvc: LocationService,
    private weatherSvc: WeatherService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const uuid = params.get('uuid');
      if (uuid) {
        this.locationSvc.getLocation(uuid).subscribe(location => {
          this.location = location;
          this.titlebarSvc.title = `Tages-Vorschau für ${location.name}`;

          this.weatherSvc.getWeatherFor(location).subscribe(weather => {
            this.weathers = weather.hourly;
          });
        })
      }
    })
  }

}
