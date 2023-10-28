import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    public static URL: string = "https://hackathon.justilian.de"

    constructor(
        private http: HttpClient
    ) {
    }
}
