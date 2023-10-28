import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgChartsModule } from 'ng2-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SchoolComponent } from './school/school.component';
import { RoomComponent } from './room/room.component';

import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {ChartModule} from 'angular-highcharts';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainMenuComponent,
        SchoolComponent,
        RoomComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      NgChartsModule,
      LeafletModule,
      HttpClientModule,
      MatListModule,
      MatDividerModule,
      MatIconModule,
      MatGridListModule,
      ChartModule,
      MatButtonModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
