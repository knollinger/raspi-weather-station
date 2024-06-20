import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '../../models/location';

import { TitlebarService } from '../../services/titlebar.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-weather-forecast-chooser',
  templateUrl: './weather-forecast-chooser.component.html',
  styleUrls: ['./weather-forecast-chooser.component.css']
})
export class WeatherForecastChooserComponent implements OnInit {

  location: Location = Location.empty();

  constructor(
    private route: ActivatedRoute,
    private titlebarSvc: TitlebarService,
    private locationSvc: LocationService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const uuid = params.get('uuid');
      if (uuid) {
        this.locationSvc.getLocation(uuid).subscribe(location => {
          this.location = location;
          this.titlebarSvc.title = `Vorschau-Auswahl für ${location.name}`;
        });
      }
    });
  }

  public get dailyRouterLink() {
    return `/dailyWeatherForecast/${this.location.uuid}`;
  }

  public get weeklyRouterLink() {
    return `/weeklyWeatherForecast/${this.location.uuid}`;
  }
}
