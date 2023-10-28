import {Component} from '@angular/core';
import {LatLngTuple, Map, marker, Marker, tileLayer} from "leaflet";
import {AddressToCoordinatesService} from "../address-to-coordinates.service";
import {AddressToCoordinatesEvent, BackendEvent} from "../backend-events";
import * as L from "leaflet";
import {School} from "../backend-structs";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
    public schools: School[] = [
        {
            name: "Hochschule Fulda",
            adresse: "Leipziger Str. 123, Fulda",
            id: "abcd-1234",
            kuerzel: "HS"
        }, {
            name: "Marianum",
            adresse: "Brüder-Grimm-Str. 1, Fulda",
            id: "1234-abcd",
            kuerzel: "MA"
        },
    ]

    options = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 15, attribution: '...'})
        ],
        zoom: 13,
        center: [50.5558, 9.6808] as LatLngTuple
    };

    layers: Marker[] = [];

    constructor(
        private a2c: AddressToCoordinatesService,
        private backend: BackendService,
        private router: Router
    ) {
        a2c.subscribers.push(this)
    }

    onMapReady(map: Map) {
        this.schools.forEach(school => {
            this.a2c.getCoordinatesFromAddress(school.adresse, school)
        })
    }

    onEvent(b: BackendEvent, data: any): void {
        if (b instanceof AddressToCoordinatesEvent) {
            this.addMarker(b.lon, b.lat, data)
            console.log(b.lon, b.lat)
        }
    }

    addMarker(lon: number, lat: number, school: School) {
        const m = marker([lat, lon], {
            icon: L.icon({
                iconUrl: 'assets/marker-icon-2x.png',     // Pfad zu Ihrem Icon
                iconSize: [32, 32],                    // Größe des Icons
                iconAnchor: [0, 32],                 // Punkt des Icons, der auf die genaue Position des Markers zeigt
                tooltipAnchor: [16, 0]
            })
        })
            .on('click', () => this.onClickMarker(school));
        m.bindTooltip(school.name, {
            permanent: true, // Damit der Tooltip immer angezeigt wird, nicht nur beim Hover
            direction: 'bottom' // Position des Tooltips relativ zum Marker; kann 'right', 'left', 'top', oder 'bottom' sein
        }).openTooltip();

        this.layers.push(m);
    }

    onClickMarker(s: School) {
        this.router.navigate(["school", s.id])
    }
}
