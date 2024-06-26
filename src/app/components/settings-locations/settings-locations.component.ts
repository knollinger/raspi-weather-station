import { AfterViewInit, Component, OnInit } from '@angular/core';

import { MatSelectionListChange } from '@angular/material/list';

import * as L from 'leaflet';

import { Location } from '../../models/location';

import { TitlebarService } from '../../services/titlebar.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-settings-locations',
  templateUrl: './settings-locations.component.html',
  styleUrls: ['./settings-locations.component.css']
})
export class SettingsLocationsComponent implements OnInit, AfterViewInit {

  locations: Location[] = new Array<Location>(0);

  private map: any;
  private markerTemplate: L.Icon;
  private currMarker: L.Marker | null = null;

  /**
   * 
   * @param titleSvc 
   * @param locationSvc 
   */
  constructor(
    private titleSvc: TitlebarService,
    private locationSvc: LocationService) {

    this.markerTemplate = L.icon({

      iconUrl: '/assets/images/marker-icon.png',
      shadowUrl: '/assets/images/marker-shadow.png',

      iconSize: [25, 41],  // size of the icon
      shadowSize: [41, 41],  // size of the shadow
      iconAnchor: [12, 41],  // point of the icon which will correspond to marker's location
      shadowAnchor: [10, 41],  // the same for the shadow
      popupAnchor: [12, -41]  // point from which the popup should open relative to the iconAnchor
    });
  }

  /**
   * 
   */
  ngOnInit(): void {

    this.titleSvc.title = 'Einstellungen - Orte';

    this.locations = this.locationSvc.getAllLocations();
  }

  /**
   * 
   */
  ngAfterViewInit(): void {
    this.initMap();
  }


  /**
   * 
   */
  private initMap(): void {

    const home = this.locations[0];
    this.map = L.map('map', {
      center: [home.latitude, home.longitude],
      zoom: 2
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.map.on('click', (evt: any) => {
      this.onMapClick(evt.latlng);
    });
  }

  /**
   * 
   * @param latLon 
   */
  onMapClick(latLon: L.LatLng) {
    this.setMarker(latLon.lat, latLon.lng);
  }

  /**
   * 
   * @param evt 
   */
  onLocationSelection(evt: MatSelectionListChange) {

    if (evt.options.length) {
      const loc = evt.options[0].value as Location;
      this.setMarker(loc.latitude, loc.longitude, loc.name);
    }
  }

  /**
   * 
   * @param lat 
   * @param lon 
   * @param name 
   */
  public setMarker(lat: number, lon: number, name?: string) {

    this.removeMarker();

    this.currMarker = L.marker([lat, lon], { icon: this.markerTemplate });
    if (name) {
      this.currMarker.bindPopup(name);
    }
    this.currMarker.addTo(this.map);
    this.map.flyTo([lat, lon], 10)
  }

  /**
   * 
   */
  public removeMarker() {
    if (this.currMarker) {
      this.map.removeLayer(this.currMarker);
      this.currMarker = null;
    }
  }

  onSearch(location: Location) {
    this.setMarker(location.latitude, location.longitude, location.name);
  }

  /**
   * 
   */
  saveLocations() {
    this.locationSvc.saveAllLocations(this.locations);
  }
}
