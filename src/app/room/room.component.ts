import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {BackendService} from "../backend.service";
import {ActivatedRoute} from "@angular/router";
import {ServiceSubscribers} from "../address-to-coordinates.service";
import {BackendEvent, GetRoomEvent} from "../backend-events";
import {DashboardTile, mapDashboardTileToChart} from "../backend-structs";
import {Chart} from "angular-highcharts";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements ServiceSubscribers {

    public tiles: DashboardTile[] = []
    public charts: Chart[] = [];

    private id: string | null

    constructor(
        public _location: Location,
        public backend: BackendService,
        private route: ActivatedRoute
    ) {
        backend.subscribers.push(this)
        this.id = route.snapshot.paramMap.get("id")
        if (!backend.activeSchool || !backend.activeRoom) {
            backend.getRoom(this.id!)
        }

        this.tiles = backend.getDashboard();
        this.tiles.forEach(t => {
            var c = mapDashboardTileToChart(t)
            this.charts.push(c)

            // @ts-ignore
            backend.getSchoolData(t).forEach(s => {
                // @ts-ignore
                c.addSeries(s, true, true)
            })
        })
    }

    onEvent(b: BackendEvent, data: any): void {
        if (b instanceof GetRoomEvent) {
            this.backend.activeRoom = b.room
            this.backend.activeSchool = b.room.schule
        }
    }
}
