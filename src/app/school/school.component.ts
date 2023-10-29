import {Component} from '@angular/core';
import {DashboardTile, Room, School} from "../backend-structs";
import {Location} from '@angular/common';
import {Chart} from 'angular-highcharts';
import {BackendService} from "../backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceSubscribers} from "../address-to-coordinates.service";
import {BackendEvent, GetGebaeudeEvent, GetSchoolEvent} from '../backend-events';
import {MatSelectionListChange} from "@angular/material/list";

@Component({
    selector: 'app-school',
    templateUrl: './school.component.html',
    styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements ServiceSubscribers {

    public tiles: DashboardTile[] = []
    public charts: Chart[] = [];

    private id: string | null

    constructor(
        public _location: Location,
        public backend: BackendService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        backend.subscribers.push(this)
        this.tiles = backend.getDashboard();
        this.tiles.forEach(t => {
            var c = this.mapDashboardTileToChart(t)
            this.charts.push(c)

            // @ts-ignore
            backend.getSchoolData(t).forEach(s => {
                // @ts-ignore
                c.addSeries(s, true, true)
            })
        })

        this.id = route.snapshot.paramMap.get("id")

        if (!(backend.activeSchool)) {
            backend.getSchool(this.id!)
        }

        if (!(backend.activeGebaeude)) {
            backend.getGebaeude()
        }
    }

    onEvent(b: BackendEvent, data: any): void {
        if (b instanceof GetSchoolEvent) {
            this.backend.getGebaeude()
        } else if (b instanceof GetGebaeudeEvent) {

        }
    }

    mapDashboardTileToChart(d: DashboardTile): Chart {
        return new Chart({
            chart: {
                type: d.options.type
            },
            title: {
                text: d.options.title
            },
            credits: {
                enabled: false
            },
            yAxis: [{
                labels: {
                    formatter: function () {
                        return this.value + (d.options.yAxis?.unit ? d.options.yAxis?.unit : "")
                    }
                },
                title: {
                    text: d.options.yAxis?.title
                }
            }, {
                labels: {
                    formatter: function () {
                        return this.value + (d.options.yAxis2?.unit ? d.options.yAxis2?.unit : "")
                    }
                },
                title: {
                    text: d.options.yAxis2?.title
                },
                opposite: true  // Diese Achse wird auf der rechten Seite angezeigt
            }],
            xAxis: {
                categories: d.options.xAxis?.categories,
                title: {
                    text: d.options.xAxis?.title
                }
            }
        });
    }

    onChangeGebaeude(e: MatSelectionListChange) {
        this.backend.activeGebaeude = e.options[0].value
        this.backend.getEtage();
    }

    onChangeEtage(e: MatSelectionListChange) {
        this.backend.activeEtage = e.options[0].value
        this.backend.getRooms()
    }

    onClickRoom(r: Room) {
        this.backend.activeRoom = r;
        this.router.navigate(["room", r.id])
    }
}
