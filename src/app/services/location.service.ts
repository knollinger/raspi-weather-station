import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { ILocation, IOSMLocation, Location } from '../models/location';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locations: Location[];

  // [{"uuid":"3","name":"Haar","longitude":11.71889427580212,"latitude":48.11070146422624,"isHome":true},{"uuid":"1","name":"Arco","longitude":10.884994372344467,"latitude":45.917721261594224,"isHome":false},{"uuid":"2","name":"Flintsbach am Inn","longitude":12.124235235549293,"latitude":47.72587250449368,"isHome":false},{"uuid":"4","name":"Lenggries","longitude":11.555764011629723,"latitude":47.6750974355193,"isHome":false},{"uuid":"6","name":"Tegernsee","longitude":11.756830215454102,"latitude":47.71397743683042,"isHome":false}]

  /**
   * 
   * @param backendRoutesSvc 
   */
  constructor(private http: HttpClient) {

    const locs = JSON.parse(window.localStorage.getItem('settings.locations') || '[]') as ILocation[]
    this.locations = locs.map(loc => {
      const x = Location.fromJson(loc);
      return x;
    });
    this.locations.sort((l1, l2) => {

      if (l1.isHome) {
        return -1;
      }

      if (l2.isHome) {
        return 1;
      }

      if (l1 < l2) {
        return -1;
      }

      if (l1 < l2) {
        return 1;
      }

      return 0;
    });

  }

  /**
   * 
   * @returns 
   */
  public getAllLocations(): Location[] {
    return this.locations;
  }


  /**
   * 
   * @returns 
   */
  public saveAllLocations(locations: Location[]) {
    
    this.locations = locations;
    const locs = locations.map(loc => {
      return loc.toJson();
    })
    window.localStorage.setItem('settings.locations', JSON.stringify(locs));
  }

  /**
   * 
   * @param uuid 
   * @returns 
   */
  public getLocation(uuid: string): Location | null {

    for (let i = 0; i < this.locations.length; ++i) {
      if (this.locations[i].uuid === uuid) {
        return this.locations[i];
      }
    }
    return null;
  }

  /**
   * 
   */
  public searchOSM(query: string): Observable<Location[]> {

            // "searchUrl": "https://nominatim.openstreetmap.org/search?q={query}&format=jsonv2",
        // "reverseUrl": "https://nominatim.openstreetmap.org/reverse.php?lat={lat}&lon={lon}&zoom=10&format=jsonv2"

    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2`;
    return this.http.get<IOSMLocation[]>(url).pipe(
      map(locs => {

        return locs.map(loc => {
          return Location.fromOSMJson(loc);
        })
      })
    );
  }
}
