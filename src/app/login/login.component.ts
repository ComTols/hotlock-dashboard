import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {ServiceSubscribers} from "../address-to-coordinates.service";
import {BackendEvent, LogInEvent} from "../backend-events";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements ServiceSubscribers{
  constructor(
    private auth:AuthService,
    private router:Router
  ) {
    auth.subscribers.push(this)
  }
  username?: string;
  password?: string;
  login() {
    if (!this.username) return;
    if (!this.password) return;
    this.auth.login(this.username, this.password)
  }

  onEvent(b: BackendEvent, data: any): void {
    if (b instanceof LogInEvent) {
      this.router.navigate(["/main-menu"])
    }
  }
}
