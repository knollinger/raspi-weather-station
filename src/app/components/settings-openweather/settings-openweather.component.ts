import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TitlebarService } from '../../services/titlebar.service';



@Component({
  selector: 'app-settings-openweather',
  templateUrl: './settings-openweather.component.html',
  styleUrls: ['./settings-openweather.component.css']
})
export class SettingsOpenweatherComponent implements OnInit {

  passwordIconName: string = 'visibility';
  passwordType:     string = 'password';

  formGroup: FormGroup;

  constructor(
    private titleSvc: TitlebarService,
    private formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      apiKey:  new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.titleSvc.title = 'Einstellungen - Openweather';
  }

  onSubmit() {
    
  }

  togglePasswordVisibility() {

    if (this.passwordIconName === 'visibility') {
      this.passwordIconName = 'visibility_off';
      this.passwordType = 'text';
    }
    else {
      this.passwordIconName = 'visibility'
      this.passwordType = 'password';
    }
  }
}
