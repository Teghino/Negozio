import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { StepperVerticalExample } from "./components/login/stepper.component";
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { gsap } from 'gsap';
import { PersonComponent } from './components/person/person.component';
import {CookieService} from 'ngx-cookie-service';
import { LocalStorageService } from './servizi/localStorage.service';
import { OggettiComponent } from './components/oggetti/oggetti.component';
import { OggettoEvidenziatoComponent } from './components/oggetto-evidenziato/oggetto-evidenziato.component';
import {MatButtonModule} from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CarrelloComponent } from './components/carrello/carrello.component';
import {MatIconModule} from '@angular/material/icon';




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        OggettiComponent,
        OggettoEvidenziatoComponent,
        CarrelloComponent,
    ],
    providers: [CookieService, LocalStorageService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        SidenavComponent,
        StepperVerticalExample,
        HttpClientModule,
        CommonModule,
        MatButtonModule,
        MatRadioModule,
        MatIconModule,
    ],
})
export class AppModule { }
