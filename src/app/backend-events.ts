import {Etage, Gebaeude, Room, School} from "./backend-structs";

export class BackendEvent {
}

export class AddressToCoordinatesEvent extends BackendEvent {
    public lon: number
    public lat: number

    constructor(lo: number, la: number) {
        super();
        this.lon = lo;
        this.lat = la;
    }
}

export class GetSchoolsEvent {
    public schools: School[]

    constructor(s: School[]) {
        this.schools = s;
    }
}

export class GetSchoolEvent {
    public school: School

    constructor(s: School) {
        this.school = s;
    }
}

export class GetGebaeudeEvent {
    public gebaeude: Gebaeude[]

    constructor(g: Gebaeude[]) {
        this.gebaeude = g;
    }
}

export class GetEtageEvent {
    public etages: Etage[]

    constructor(e: Etage[]) {
        this.etages = e;
    }
}

export class GetRoomEvent {
    public rooms: Room[]

    constructor(r: Room[]) {
        this.rooms = r;
    }
}
