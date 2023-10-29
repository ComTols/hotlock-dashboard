import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  DashboardTile, Etage,
  Gebaeude,
  GetEtageAnswer,
  GetGebaeudeAnswer, GetRoomAnswer, GetRoomsAnswer,
  GetSchoolAnswer,
  GetSchoolsAnswer, GetTemperaturesAnswer, Room,
  School
} from "./backend-structs";
import {ServiceSubscribers} from "./address-to-coordinates.service";
import {
  GetEtageEvent,
  GetGebaeudeEvent,
  GetRoomEvent,
  GetRoomsEvent,
  GetSchoolEvent,
  GetSchoolsEvent, GetTemperaturesEvent
} from "./backend-events";
import {Chart} from "angular-highcharts";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    public static URL: string = "https://hackathon.justilian.de"
    public subscribers: ServiceSubscribers[] = []

    public schools: School[] = []
    public activeSchool?: School
    public gebaeude: Gebaeude[] = []
    public activeGebaeude?: Gebaeude
    public etages: Etage[] = []
    public activeEtage?: Etage
    public rooms: Room[] = []
    public activeRoom?: Room

    constructor(
        private http: HttpClient
    ) {
    }

    getSchools() {
        this.http.get<GetSchoolsAnswer>(BackendService.URL + "/getschule").subscribe(value => {
            this.schools = value.content
            console.log("Hallo2")
            this.subscribers.forEach(sub => {
                sub.onEvent(new GetSchoolsEvent(this.schools), null)
            })
        }, err => {
            console.error(err)
        })
    }

    getSchool(id: string) {
        this.http.get<GetSchoolAnswer>(BackendService.URL + "/getschule/" + encodeURIComponent(id)).subscribe(value => {
            this.activeSchool = value.content
            this.subscribers.forEach(sub => {
                sub.onEvent(new GetSchoolEvent(this.activeSchool!), null)
            })
        }, err => {
            console.error(err)
        })
    }

    getGebaeude() {
        if (!(this.activeSchool)) return;
        this.http.get<GetGebaeudeAnswer>(BackendService.URL + "/getgebaeude/" + encodeURIComponent(this.activeSchool?.id!)).subscribe(
            value => {
                this.gebaeude = value.content
                this.subscribers.forEach(sub => {
                    sub.onEvent(new GetGebaeudeEvent(this.gebaeude!), null)
                })
            }
        )
    }

    getEtage() {
        if (!(this.activeGebaeude)) return;
        this.http.get<GetEtageAnswer>(BackendService.URL + "/getetage/" + encodeURIComponent(this.activeGebaeude.id!)).subscribe(
            value => {
                this.etages = value.content
                this.subscribers.forEach(sub => {
                    sub.onEvent(new GetEtageEvent(this.etages), null)
                })
            }, error => {
                console.error(error);
            }
        )
    }

    getRooms() {
        if (!(this.activeEtage)) return;
        this.http.get<GetRoomsAnswer>(BackendService.URL + "/getraeume/" + encodeURIComponent(this.activeEtage.id!)).subscribe(
            value => {
                this.rooms = value.content
                this.subscribers.forEach(sub => {
                    sub.onEvent(new GetRoomsEvent(this.rooms), null)
                })
            }, error => {
                console.error(error);
            }
        )
    }

    getRoom(id: string) {
        this.http.get<GetRoomAnswer>(BackendService.URL + "/getraum/" + encodeURIComponent(id)).subscribe(value => {
            console.log(value)
            this.subscribers.forEach(sub => {
                sub.onEvent(new GetRoomEvent(value.content), null)
            })
        })
    }
    getTemperatures(c: Chart) {
      if (!this.activeRoom) return;
      this.http.get<GetTemperaturesAnswer>(BackendService.URL + "/gettemperatur/" + encodeURIComponent(this.activeRoom!.id) + "/" + encodeURIComponent(new Date().toISOString().split("T")[0])).subscribe(value => {
        console.log(value)
        this.subscribers.forEach(sub => {
          sub.onEvent(new GetTemperaturesEvent(value.content), c)
        })
      })
    }
    getDashboard(): DashboardTile[] {
      if (this.activeRoom) {
        return [{
          size: {
            col: 2,
            row: 2
          },
          options: {
            title: "Temperaturverlauf",
            type: "line",
            requestKey: "temperature",
            yAxis: {
              title: "Temperatur",
              unit: "°C"
            }
          }
        }]
      }
        return [
            {
                size: {
                    col: 2,
                    row: 2
                },
                options: {
                    title: "Tagesverbrauch",
                    type: "line",
                    requestKey: "usage",
                    xAxis: {
                        categories: ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h"]
                    },
                    yAxis: {
                        title: "Verbrauch",
                        unit: "kw/h"
                    },
                    yAxis2: {
                        title: "Außentemperatur",
                        unit: "°C"
                    }
                }
            }, {
                size: {
                    col: 1,
                    row: 2
                },
                options: {
                    title: "Ausgaben",
                    type: "pie",
                    requestKey: "expenditure"
                }
            }, {
            size: {
              col: 1,
              row: 2
            },
            options: {
              title: "Auslastung der Räume",
              type: "bar",
              requestKey: "usage_2",
              xAxis: {
                categories: ["Geb. 31", "Geb. 46", "Geb. 21"]
              },
              yAxis: {
                title: "Auslastung",
                unit: "%"
              }
            }
          }
        ]
    }

    getSchoolData(d: DashboardTile): { name: string, data: any[], yAxis?: number }[] {
        switch (d.options.requestKey) {
            case "usage":
                return [{
                    name: "Verbrauch",
                    data: [2, 2, 2, 2, 5, 10, 7, 7, 7, 6, 6, 7, 5, 4, 3, 7, 7, 2, 2, 2, 2, 2, 2, 2],
                    yAxis: 0
                }, {
                    name: "Temperatur",
                    data: [8, 8, 8, 9, 10, 12, 12, 13, 12, 14, 13, 14, 11, 10, 8, 8, 7, 7, 7, 5, 5, 5, 6, 6],
                    yAxis: 1
                }]
            case "expenditure":
                return [{
                    name: "Brands", data: [
                        {name: 'Heizung', y: 61.41, sliced: true, selected: true},
                        {name: 'Wasser', y: 11.84},
                        {name: 'Strom', y: 10.85},
                        {name: 'Wartung', y: 4.67}
                    ]
                }
                ]
          case "usage_2":
              return[
                {
                  name: "Wert", data: [
                    75,
                    54,
                    90
                  ]
                }
              ]
        }
        return []
    }

    getRoomData(d: DashboardTile, c: Chart) {
      switch(d.options.requestKey) {
        case "temperature":
          this.getTemperatures(c)
      }
    }
}
