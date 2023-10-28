export class BackendEvent {}

export class AddressToCoordinatesEvent extends BackendEvent {
  public lon: number
  public lat: number

  constructor(lo: number, la: number) {
    super();
    this.lon = lo;
    this.lat = la;
  }
}
