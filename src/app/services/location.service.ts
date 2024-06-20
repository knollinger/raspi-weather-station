import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Location } from '../models/location';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private static locations = new Map<string, Location>(
    [
      ['1', new Location('1', 'Arco', 10.884994372344467, 45.917721261594224, false)],
      ['2', new Location('2', 'Flintsbach am Inn', 12.124235235549293, 47.72587250449368, false)],
      ['3', new Location('3', 'Haar', 11.71889427580212, 48.11070146422624, true)],
      ['4', new Location('4', 'Lenggries', 11.555764011629723, 47.6750974355193, false)],
      // ['5', new Location('4', 'Rosenheim', 12.127569181796968, 47.85417772584609, false)],
      ['6', new Location('6', 'Tegernsee', 11.756830215454102, 47.71397743683042, false)],
    ]
  );

  /**
   * 
   * @param backendRoutesSvc 
   */
  constructor() {

  }

  /**
   * 
   * @returns 
   */
  public getAllLocations(): Observable<Location[]> {

    const locations = new Array<Location>(0);

    LocationService.locations.forEach((location, key, map) => {
      locations.push(location);
    });

    locations.sort((l1, l2) => {
      
      if(l1.isHome) {
        return -1;
      }

      if(l2.isHome) {
        return 1;
      }

      if(l1 < l2) {
        return -1;
      }

      if(l1 < l2) {
        return 1;
      }

      return 0;
    });
    return of(locations);
  }

  /**
   * 
   * @param uuid 
   * @returns 
   */
  public getLocation(uuid: string): Observable<Location> {

    const loc = LocationService.locations.get(uuid) || Location.empty(); 
    return of(loc);
  }
}
