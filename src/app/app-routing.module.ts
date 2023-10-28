import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {SchoolComponent} from "./school/school.component";
import {RoomComponent} from "./room/room.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  }, {
    path: "main-menu",
    component: MainMenuComponent
  }, {
    path: "school/:id",
    component: SchoolComponent
  }, {
    path: "room/:id",
    component: RoomComponent
  }, {
    path: "",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
