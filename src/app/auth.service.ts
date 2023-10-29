import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServiceSubscribers} from "./address-to-coordinates.service";
import {BackendService} from "./backend.service";
import {Answer} from "./backend-structs";
import {LogInEvent} from "./backend-events";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public token: string = "";
    public log: boolean = false;
    public subscribers: ServiceSubscribers[] = [];

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        if (localStorage.getItem("token") != null) {
            this.token = localStorage.getItem("token")!
            this.log = true;
        }
        router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                if (event.url != "/login" && !this.log) {
                    router.navigate(["/login"])
                }
            })
    }

    public login(username: string, password: string) {
        this.http.post<Answer>(BackendService.URL + "/authenticate", {
            username: username,
            password: password
        }).subscribe(value => {
                this.token = value.token
                localStorage.setItem("token", this.token)
                this.log = true
                this.subscribers.forEach(sub => {
                    sub.onEvent(new LogInEvent(), null)
                })
            }, error => {
                this.token = ""
                this.log = false
            }
        )
    }

    public logout() {
        this.token = ""
        this.log = false
        this.router.navigate(["/login"])
    }
}
