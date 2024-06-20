import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SettingsMainComponent } from './components/settings-main/settings-main.component';
import { PanelComponent } from './components/panel/panel.component';
import { WeatherLocationsDashboardComponent } from './components/weather-locations-dashboard/weather-locations-dashboard.component';
import { WeatherForecastChooserComponent } from './components/weather-forecast-chooser/weather-forecast-chooser.component';
import { WeatherWeeklyForecastDashboardComponent } from './components/weather-weekly-forecast-dashboard/weather-weekly-forecast-dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { WeatherDailyForecastComponent } from './components/weather-daily-forecast/weather-daily-forecast.component';
import { SettingsLocationsComponent } from './components/settings-locations/settings-locations.component';
import { SettingsOpenweatherComponent } from './components/settings-openweather/settings-openweather.component';
import { MinLocationDimensionsDirective } from './directives/min-location-dimensions.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PanelComponent,
    WeatherLocationsDashboardComponent,
    WeatherForecastChooserComponent,
    WeatherWeeklyForecastDashboardComponent,
    WeatherDailyForecastComponent,
    SettingsMainComponent,
    SettingsLocationsComponent,
    SettingsOpenweatherComponent,
    MinLocationDimensionsDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatRippleModule,
    MatListModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
