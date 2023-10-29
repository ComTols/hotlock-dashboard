import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {BackendService} from "../backend.service";
import {ActivatedRoute} from "@angular/router";
import {ServiceSubscribers} from "../address-to-coordinates.service";
import {BackendEvent, GetRoomEvent, GetTemperaturesEvent} from "../backend-events";
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
    }

    onEvent(b: BackendEvent, data: any): void {
        if (b instanceof GetRoomEvent) {
            this.backend.activeRoom = b.room
            this.backend.activeSchool = b.room.schule
          this.tiles = this.backend.getDashboard();
          this.tiles.forEach(t => {
            var c = mapDashboardTileToChart(t)
            this.charts.push(c)
            this.backend.getRoomData(t, c)

            // @ts-ignore
            this.backend.getSchoolData(t).forEach(s => {
              // @ts-ignore
              c.addSeries(s, true, true)
            })
          })
        } else if (b instanceof GetTemperaturesEvent){
          var popo:number[]  = [] //Produktive Operative Prozessoptimierung, defintiv kein ShitCode
          var popo2:string[] = []
          b.temperatures.forEach(t => {
            popo.push(t.value)
            popo2.push(t.zeitpunkt.split("T")[1].substring(0, 5))
          })
          data.addSeries({
            name: "Temperaturverlauf",
            data: popo
          })
          data.ref.xAxis[0].setCategories(popo2)
        }
    }
}
