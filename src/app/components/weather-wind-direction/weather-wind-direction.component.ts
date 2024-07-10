import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-wind-direction',
  templateUrl: './weather-wind-direction.component.html',
  styleUrls: ['./weather-wind-direction.component.css']
})
export class WeatherWindDirectionComponent implements OnInit {

  @Input()
  direction: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  get windDir(): string {
    return `rotateZ(${this.direction}deg)`;
  }

}
