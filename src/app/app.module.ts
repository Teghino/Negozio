import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { StepperVerticalExample } from "./components/login/stepper.component";
import { HttpClientModule } from '@angular/common/http';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtService } from './servizi/jwt.service';



@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        SidenavComponent,
        StepperVerticalExample,
        HttpClientModule,
    ]
})
export class AppModule { }
