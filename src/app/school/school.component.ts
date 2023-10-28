import {Component} from '@angular/core';
import {DashboardTile, School} from "../backend-structs";
import {Location} from '@angular/common';
import {Chart} from 'angular-highcharts';

@Component({
    selector: 'app-school',
    templateUrl: './school.component.html',
    styleUrls: ['./school.component.scss']
})
export class SchoolComponent {
    public school?: School

    public tiles: DashboardTile[] = []

    constructor(
        public _location: Location
    ) {
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
            yAxis: {
                labels: {
                    format: '{value}' + d.options.yAxis.unit
                },
                title: {
                    text: d.options.yAxis.title
                }
            },
            xAxis: {
                categories: d.options.xAxis.categories,
                title: {
                    text: d.options.xAxis.title
                }
            }
        });
    }
}
