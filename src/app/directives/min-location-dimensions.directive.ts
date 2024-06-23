import { Directive, HostBinding, OnInit } from '@angular/core';

import { LocationService } from '../services/location.service';

@Directive({
  selector: '[appMinLocationDimensions]'
})
export class MinLocationDimensionsDirective implements OnInit {

  @HostBinding('style.minWidth')
  minWidth = 'unset';

  @HostBinding('style.minHeight')
  minHeight = 'unset';

  /**
   * 
   * @param locationSvc 
   */
  constructor(private locationSvc: LocationService) {

  }

  ngOnInit(): void {

    const locations = this.locationSvc.getAllLocations();
    const nrOfLocs = locations.length;


    if (nrOfLocs > 4) {
      this.minWidth = `21%`
      this.minHeight = '40%';
    }
    else {
      this.minWidth = `${Math.floor(85 / nrOfLocs)}%`
      this.minHeight = '85%';

    }
  }
}
