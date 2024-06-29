import { Component, OnDestroy, OnInit } from '@angular/core';

import { IBaseWeather } from '../../models/weather-model';
import { Location } from '../../models/location';
import { ActivatedRoute } from '@angular/router';
import { TitlebarService } from '../../services/titlebar.service';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { PlotterService } from '../../services/plotter.service';

@Component({
  selector: 'app-weather-daily-forecast',
  templateUrl: './weather-daily-forecast.component.html',
  styleUrls: ['./weather-daily-forecast.component.css']
})
export class WeatherDailyForecastComponent implements OnInit, OnDestroy {

  location: Location = Location.empty();
  weathers: IBaseWeather[] = new Array<IBaseWeather>(0);

  private timerId: number = -1;

  private currPlotId = 0;
  private plots: string[] = [
    'temp',
    'pressure',
    'wind_speed'
  ];


  /**
   * 
   * @param route 
   * @param titlebarSvc 
   * @param locationSvc 
   * @param weatherSvc 
   * @param plotterSvc
   */
  constructor(
    private route: ActivatedRoute,
    private titlebarSvc: TitlebarService,
    private locationSvc: LocationService,
    private weatherSvc: WeatherService,
    private plotterSvc: PlotterService) {

  }

  /** 
   * 
   */
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const uuid = params.get('uuid');
      if (uuid) {
        this.location = this.locationSvc.getLocation(uuid) || Location.empty();
        this.titlebarSvc.title = `Tages-Vorschau für ${this.location.name}`;

        this.weatherSvc.getWeatherFor(this.location).subscribe(weather => {
          this.weathers = weather.hourly;

          this.timerId = window.setInterval(() => {
            this.drawPlots();
          }, 10000)
          this.drawPlots();
        });
      }
    })
  }

  ngOnDestroy(): void {

    window.clearInterval(this.timerId);
  }

  drawPlots() {

    let x: string[] = new Array<string>(0);
    let y: number[] = new Array<number>(0);
    let i: number = 0;

    const propName = this.plots[this.currPlotId];
    this.weathers.forEach(w => {

      if (i < 24) {
        x.push(new Date(w.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        y.push(this.getValue(w));
      }
      i++;
    });
    this.plotterSvc.plotLine(this.getTitle(), "plot", x, y);
    this.currPlotId++;
    if (this.currPlotId > 3) {
      this.currPlotId = 0;
    }
  }

  /**
   * 
   * @param wether 
   */
  private getValue(weather: IBaseWeather): number {

    switch (this.currPlotId) {
      case 0:
        return weather.temp;

      case 1:
        return weather.pressure;

      case 2:
        return weather.humidity;

      case 3:
        return weather.rain || weather.snow || 0;
    }
    return 0;
  }

  private getTitle(): string {

    switch (this.currPlotId) {
      case 0:
        return 'Temperatur';

      case 1:
        return 'Luftdruck';

      case 2:
        return 'Luftfeuchtigkeit';

      case 3:
        return 'Niederschlag';
    }
    return '';
  }
}
