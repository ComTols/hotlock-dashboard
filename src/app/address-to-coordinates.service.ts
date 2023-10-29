import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddressToCoordinatesEvent, BackendEvent} from "./backend-events";
import {BackendService} from "./backend.service";
import {count} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressToCoordinatesService {

  public subscribers: ServiceSubscribers[] = []
  private counter: number = 0

  constructor(
    private http: HttpClient,
    private backend: BackendService
  ) {}

  public getCoordinatesFromAddress(): void {
    if (this.counter >= this.backend.schools.length) return;
    var a = this.backend.schools[this.counter].adresse
    var data = this.backend.schools[this.counter]
    this.counter++
    console.log(data)
    console.log(encodeURIComponent(a))
    this.http.get<{lon: string, lat:string}[]>("https://geocode.maps.co/search?q=" + encodeURIComponent(a)).subscribe(value => {
      console.log(value)
      this.subscribers.forEach(subs => {
        subs.onEvent(new AddressToCoordinatesEvent(+value[0].lon, +value[0].lat), data)
      })
    }, error => {
      console.error(error)
    })
  }
}

export interface ServiceSubscribers {
  onEvent(b: BackendEvent, data: any): void;
}
