import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherCurrentComponent } from './components/weather-current/weather-current.component';
import { WeatherWeeklyForecastDashboardComponent } from './components/weather-weekly-forecast-dashboard/weather-weekly-forecast-dashboard.component';
import { WeatherDailyForecastComponent } from './components/weather-daily-forecast/weather-daily-forecast.component';

import { SettingsLocationsComponent } from './components/settings-locations/settings-locations.component';
import { SettingsOpenweatherComponent } from './components/settings-openweather/settings-openweather.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'weatherCurrent',
    pathMatch: 'full'
  },
  {
    path: 'weatherCurrent',
    component: WeatherCurrentComponent
  },
  {
    path: 'weeklyWeatherForecast/:uuid',
    component: WeatherWeeklyForecastDashboardComponent
  },
  {
    path: 'dailyWeatherForecast/:uuid',
    component: WeatherDailyForecastComponent
  },
  {
    path: 'settings/locations',
    component: SettingsLocationsComponent
  },  
  {
    path: 'settings/openweather',
    component: SettingsOpenweatherComponent
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
