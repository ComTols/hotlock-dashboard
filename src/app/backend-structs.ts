import {Chart} from "angular-highcharts";

export interface School {
    id: string
    name: string
    adresse: string
    kuerzel: string
}

export interface DashboardTile {
    size?: {
        col: number
        row: number
    }
    position?: {
        col: number
        row: number
    }
    options: {
        type: string
        title?: string
        yAxis?: {
            unit?: string,
            title?: string
        }
        yAxis2?: {
            unit?: string,
            title?: string
        }
        xAxis?: {
            categories?: string[]
            title?: string
        }
        requestKey: "usage" | "expenditure" | "usage_2" | "temperature"
    }
}

export function mapDashboardTileToChart(d: DashboardTile): Chart {
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

export interface Answer {
    access: boolean
    content: any
    error: string[]
    msg: string
    token: string
}

export interface GetSchoolsAnswer extends Answer {
    content: School[]
}export interface GetTemperaturesAnswer extends Answer {
    content: Temperature[]
}

export interface GetSchoolAnswer extends Answer {
    content: School
}

export interface GetGebaeudeAnswer extends Answer {
    content: Gebaeude[]
}

export interface GetEtageAnswer extends Answer {
    content: Etage[]
}

export interface GetRoomsAnswer extends Answer {
    content: Room[]
}

export interface GetRoomAnswer extends Answer {
    content: Room
}

export interface School {
    adresse: string,
    id: string,
    kuerzel: string,
    name: string
}
export interface Temperature {
    "id": string,
    "raum": string,
    "value": number,
    "zeitpunkt": string
}

export interface Gebaeude {
    id: string,
    name: string,
    school: string
}

export interface Etage {
    etage: number,
    gebaeude: string,
    id: string
}

export interface Room {
    etage: string | Etage,
    id: string,
    nr: string,
    solltemp: number,
    type: string,
    gebaeude?: Gebaeude
    schule?: School
}
