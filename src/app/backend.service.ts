import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
    DashboardTile, Etage,
    Gebaeude,
    GetEtageAnswer,
    GetGebaeudeAnswer, GetRoomsAnswer,
    GetSchoolAnswer,
    GetSchoolsAnswer, Room,
    School
} from "./backend-structs";
import {ServiceSubscribers} from "./address-to-coordinates.service";
import {GetEtageEvent, GetGebaeudeEvent, GetRoomEvent, GetSchoolEvent, GetSchoolsEvent} from "./backend-events";

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
                console.log(value)
                this.rooms = value.content
                console.log(this.rooms)
                this.subscribers.forEach(sub => {
                    sub.onEvent(new GetEtageEvent(this.etages), null)
                })
            }, error => {
                console.error(error);
            }
        )
    }

    getDashboard(): DashboardTile[] {
        return [
            {
                size: {
                    col: 2,
                    row: 2
                },
                options: {
                    title: "Test",
                    type: "line",
                    requestKey: "temperatur"
                }
            },
            {
                size: {
                    col: 2,
                    row: 2
                },
                options: {
                    title: "Test2",
                    type: "line",
                    requestKey: "temperatur"
                }
            }
        ]
    }
}
