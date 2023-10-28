import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddressToCoordinatesEvent, BackendEvent} from "./backend-events";

@Injectable({
  providedIn: 'root'
})
export class AddressToCoordinatesService {

  public subscribers: ServiceSubscribers[] = []

  constructor(
    private http: HttpClient
  ) {}

  public getCoordinatesFromAddress(a: string, data: any): void {
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
