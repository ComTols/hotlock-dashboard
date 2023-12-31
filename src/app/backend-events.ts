import {Etage, Gebaeude, Room, School, Temperature} from "./backend-structs";

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

export class GetSchoolsEvent extends BackendEvent {
    public schools: School[]

    constructor(s: School[]) {
        super();
        this.schools = s;
    }
}

export class GetSchoolEvent extends BackendEvent {
    public school: School

    constructor(s: School) {
        super();
        this.school = s;
    }
}

export class GetGebaeudeEvent extends BackendEvent {
    public gebaeude: Gebaeude[]

    constructor(g: Gebaeude[]) {
        super();
        this.gebaeude = g;
    }
}

export class GetEtageEvent extends BackendEvent {
    public etages: Etage[]

    constructor(e: Etage[]) {
        super();
        this.etages = e;
    }
}

export class GetRoomsEvent extends BackendEvent {
    public rooms: Room[]

    constructor(r: Room[]) {
        super();
        this.rooms = r;
    }
}

export class GetRoomEvent extends BackendEvent {
  public room: Room

  constructor(r: Room) {
    super();
    this.room = r;
  }
}
export class GetTemperaturesEvent extends BackendEvent {
  public temperatures: Temperature[]

  constructor(t: Temperature[]) {
    super();
    this.temperatures = t;
  }
}

export class LogInEvent extends BackendEvent {
}
