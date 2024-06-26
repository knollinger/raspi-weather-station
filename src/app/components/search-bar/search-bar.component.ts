import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { debounceTime, Subject } from 'rxjs';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output()
  location: EventEmitter<Location> = new EventEmitter<Location>();
  
  private search: Subject<string> = new Subject<string>();
  locations: Location[] = new Array<Location>(0);

  constructor(private locSvc: LocationService) {
  }

  ngOnInit(): void {

    this.search.pipe(
      debounceTime(500),
      (observable) => {
        return observable;
      }
    ).subscribe(query => {

      this.locSvc.searchOSM(query).subscribe(locations => {
        this.locations = locations;
      })
    })
  }

  /**
     * 
     * @param event 
    */
  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.next(input.value);
  }


  /**
   * 
   * @param evt 
   */
  onOptionSelected(evt: MatAutocompleteSelectedEvent) {
    this.location.emit(evt.option.value);
  }
}
