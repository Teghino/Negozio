import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperVerticalExample } from './components/login/stepper.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { HomeComponent } from './components/home/home.component';
import { PersonComponent } from './components/person/person.component';
import { OggettiComponent } from './components/oggetti/oggetti.component';
import { OggettoEvidenziatoComponent } from './components/oggetto-evidenziato/oggetto-evidenziato.component';


const routes: Routes = [
  {path: '', component: RegistrazioneComponent},
  {path: 'login', component: StepperVerticalExample},
  {path: 'home', component: HomeComponent},
  {path: 'person', component: PersonComponent},
  {path: 'oggetti', component: OggettiComponent},
  {path: 'oggetti/evidenziato/:id', component: OggettoEvidenziatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }