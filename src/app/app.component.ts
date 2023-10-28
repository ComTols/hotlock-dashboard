import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { Map, tileLayer, marker, Marker } from 'leaflet';
import { LatLngTuple } from 'leaflet';
import {AddressToCoordinatesService, ServiceSubscribers} from "./address-to-coordinates.service";
import {AddressToCoordinatesEvent, BackendEvent} from "./backend-events";
import * as L from 'leaflet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ServiceSubscribers{
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 15, attribution: '...' })
    ],
    zoom: 13,
    center: [50.5558, 9.6808] as LatLngTuple
  };

  layers: Marker[] = [];

  constructor(
    private a2c: AddressToCoordinatesService
  ) {
    a2c.subscribers.push(this)
  }

  onMapReady(map: Map) {
    /*
    const m = marker([51.505, -0.09])
      .on('click', () => console.log('Marker clicked!'));
    this.layers.push(m);
    // Fügen Sie hier weitere Marker hinzu, wenn Sie möchten
     */
    this.a2c.getCoordinatesFromAddress("Leipziger Str. 123, Fulda")
  }

  onEvent(b: BackendEvent): void {
    if(b instanceof AddressToCoordinatesEvent) {
      this.addMarker(b.lon, b.lat)
      console.log(b.lon, b.lat)
    }
  }

  addMarker(lon: number, lat: number) {
    const m = marker([lat, lon], {
      icon: L.icon({
        iconUrl: 'assets/marker-icon-2x.png',     // Pfad zu Ihrem Icon
        iconSize: [32, 32],                   // Größe des Icons
        iconAnchor: [0, 32],                 // Punkt des Icons, der auf die genaue Position des Markers zeigt
        })
    })
      .on('click', () => console.log('Marker clicked!'));
    m.bindTooltip('Ihr Text hier', {
      permanent: false, // Damit der Tooltip immer angezeigt wird, nicht nur beim Hover
      direction: 'bottom' // Position des Tooltips relativ zum Marker; kann 'right', 'left', 'top', oder 'bottom' sein
    }).openTooltip();

    this.layers.push(m);
  }
}
