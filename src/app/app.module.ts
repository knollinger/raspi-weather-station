import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LOCALE_ID } from '@angular/core'
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

import { HttpClientModule } from '@angular/common/http';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PanelComponent } from './components/panel/panel.component';
import { WeatherWeeklyForecastDashboardComponent } from './components/weather-weekly-forecast-dashboard/weather-weekly-forecast-dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { WeatherDailyForecastComponent } from './components/weather-daily-forecast/weather-daily-forecast.component';
import { SettingsLocationsComponent } from './components/settings-locations/settings-locations.component';
import { SettingsOpenweatherComponent } from './components/settings-openweather/settings-openweather.component';
import { MinLocationDimensionsDirective } from './directives/min-location-dimensions.directive';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherCurrentComponent } from './components/weather-current/weather-current.component';
import { WeatherWindDirectionComponent } from './components/weather-wind-direction/weather-wind-direction.component';
import { DotIndicatorComponent } from './components/dot-indicator/dot-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PanelComponent,
    WeatherWeeklyForecastDashboardComponent,
    WeatherDailyForecastComponent,
    SettingsLocationsComponent,
    SettingsOpenweatherComponent,
    MinLocationDimensionsDirective,
    SearchBarComponent,
    WeatherCurrentComponent,
    WeatherWindDirectionComponent,
    DotIndicatorComponent,
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
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatMenuModule,

    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID, 
      useValue: 'de-DE' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
