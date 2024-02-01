import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperVerticalExample } from './components/login/stepper.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { HomeComponent } from './components/home/home.component';
import { PersonComponent } from './components/person/person.component';
import { OggettiComponent } from './components/oggetti/oggetti.component';
import { OggettoEvidenziatoComponent } from './components/oggetto-evidenziato/oggetto-evidenziato.component';
import { CarrelloComponent } from './components/carrello/carrello.component';


const routes: Routes = [
  {path: '', component: RegistrazioneComponent},
  {path: 'login', component: StepperVerticalExample},
  {path: 'home', component: CarrelloComponent},
  {path: 'person', component: PersonComponent},
  {path: 'oggetti', component: OggettiComponent},
  {path: 'oggetti/evidenziato/:id', component: OggettoEvidenziatoComponent},
  {path: 'carrello', component: CarrelloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
