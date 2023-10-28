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
export class AppComponent{

}
